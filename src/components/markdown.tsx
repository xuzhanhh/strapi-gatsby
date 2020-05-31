import * as React from 'react';
import ReactMarkdown from "react-markdown"
import { Container, Styled, jsx, Flex, useColorMode } from "theme-ui"
import CodeBlock from '../components/code-block';
import { useIntersection } from '../components/sticky';
function Image(props) {
  return <img {...props} style={{ maxWidth: '100%' }} />
}


const Markdown = ({ data, addTitleList, setActiveTitle }) => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`
  const transformArticle = (data) => {
    const ret = data.replaceAll(/<img src=\"https:\/\/res.cloudinary.com\/dfafucj5l\/image\/upload\/v\d+\/ac\/(.*?).png" \/>/, (...data) => {
      return data[0].substr(0, data[0].length - 2) + `style="width:70px; filter:invert(${isDark ? 0.9 : 0})" />`
    })
    return ret
  }

  function Heading(props) {
    const { level, children } = props;
    const titleProps = {
      name: children?.[0]?.props?.children
    }
    console.log(props)
    const ref = React.useRef();
    const data = useIntersection(ref, { threshold: 0.1})
    React.useEffect(()=>{
      if(data && (data.isIntersecting === false && data.boundingClientRect.y <=0))
      {
        setActiveTitle(children?.[0]?.props?.children)
      }
      if(data && data.isIntersecting === true &&  data.boundingClientRect.y<10) {
        setActiveTitle(children?.[0]?.props?.children, -1)
      }
    }, [data])
    console.log('data', data)
    addTitleList && addTitleList({ level, key: children?.[0]?.key, name: children?.[0]?.props?.children })
    switch (level) {
      case 1: return <h1 ref={ref} {...titleProps}>{children}</h1>
      case 2: return <h2 ref={ref} {...titleProps}>{children}</h2>
      case 3: return <h3  ref={ref}{...titleProps}>{children}</h3>
      case 4: return <h4  ref={ref}{...titleProps}>{children}</h4>
      case 5: return <h5  ref={ref}{...titleProps}>{children}</h5>
      case 6: return <h6  ref={ref}{...titleProps}>{children}</h6>
    }
  }
  return (
    <ReactMarkdown
      source={transformArticle(data)}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
      escapeHtml={false}
      renderers={{ code: CodeBlock, image: Image, heading: Heading }}
    />
  )
}

export default Markdown;
