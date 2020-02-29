import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';

interface UseOnShowConfigProps extends Omit<IntersectionObserverInit, 'root'> {
  once?: boolean;
  root?: string | Element | React.RefObject<any> | null;
}

export function useForceUpdate(): () => void {
  const [, dispatch] = useState<{}>(Object.create(null));

  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useCallback(
    (): void => {
      dispatch(Object.create(null));
    },
    [dispatch],
  );
  return memoizedDispatch;
}

export const useIntersection: (ref: React.RefObject<any>, config?: UseOnShowConfigProps) => IntersectionObserverEntry | null =
  (ref, config = {}) => {
    const { once = false, root = null, rootMargin, threshold } = config;

    const [data, changeData] = useState<IntersectionObserverEntry | null>(null);
    useEffect(() => {
      let rootElement: Element | null = null;
      if (root !== null) {
        if (typeof root === 'string') {
          rootElement = document.querySelector(root);
        } else if (root instanceof Element) {
          rootElement = root;
        } else {
          rootElement = root.current ? root.current : root;
        }
      }
      const observer = new IntersectionObserver(entries => {
        const { isIntersecting } = entries[0];
        if (isIntersecting && once) {
          observer.unobserve(ref.current);
        }
        changeData(entries[0]);
      }, {
        root: rootElement,
        rootMargin,
        threshold,
      });
      observer.observe(ref.current);
      return () => {
        observer.unobserve(ref.current);
      };
    }, [rootMargin, threshold, once]);
    return data;
  };


const ref2DOM = (ref) => {
  if (ref.current instanceof HTMLElement) {
    return ref.current
  } else if (ref.current instanceof React.Component) {
    return ReactDOM.findDOMNode(ref.current)
  } throw '<Sticky>传入的元素必须为能寻找真实DOM节点的元素，如遇函数式组件请看文档使用React.forwarRef进行ref绑定';

}
const Sticky: React.FunctionComponent<{
  root?: string | Element | React.RefObject<any> | null;
  rootMargin?: string | undefined;
  children: ({ style }: { style: React.CSSProperties }) => React.ReactElement;
}> = ({ root, children, rootMargin }) => {
  const forceUpdate = useForceUpdate();
  const wrapperRef = useRef(null);
  const contentRef = useRef<any>(null);
  const placementRef = useRef<any>(null);
  const rootBoundsRef = useRef<any>(null);
  const [sticky, setSticky] = useState<boolean>(false);
  const entry = useIntersection(wrapperRef, { root: root, threshold: 1, rootMargin });
  useEffect(() => {
    if (entry) {
      const { boundingClientRect: { top }, rootBounds } = entry;
      rootBoundsRef.current = rootBounds;
      if ((top - (rootBounds as DOMRect).top) < 0) {
        // 应该sticky
        setSticky(true);
      } else {
        // 取消sticky
        setSticky(false);
      }
    }
  }, [entry]);

  const currentClientRect = sticky ? ref2DOM(contentRef).getBoundingClientRect() : null;
  const placementClientRect = sticky ? placementRef.current.getBoundingClientRect() : null;
  const originChildrenStyle: React.CSSProperties = sticky ? {
    position: sticky ? 'fixed' : undefined,
    top: sticky ? Math.floor(rootBoundsRef.current.top) : undefined,
    left: sticky ? placementClientRect.left : undefined,
    width: sticky ? placementClientRect.width < currentClientRect.width ? placementClientRect.width : currentClientRect.width : undefined
    // right: sticky ? document.body.clientWidth - (placementClientRect.left + placementClientRect.width) : undefined,
  } : {};
  useEffect(() => {
    const throttleForceUpdate = throttle(() => { forceUpdate() }, 50);
    const handleResize = (e: Event) => { throttleForceUpdate() };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const element = React.cloneElement(
    children({ style: originChildrenStyle }),
    {
      ref: contentRef
    },
  )
  return (
    <div ref={wrapperRef}>
      <div ref={placementRef} className="placement" style={{ height: sticky ? currentClientRect.height : null, width: 1 }} />
      {
        element
      }
    </div>
  );
};

export default Sticky;
