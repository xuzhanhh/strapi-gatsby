import React from 'react'
import { createPortal } from 'react-dom'
// import Router from 'next/router'
// import Head from 'next/head'
// import Link from 'next/link'
import { Link } from "gatsby"
import { useDocSearchKeyboardEvents } from '@docsearch/react'
import { DocSearchModal } from '@docsearch/react/modal'
import '@docsearch/react/dist/style.css'
// import { siteConfig } from 'siteConfig'

const SearchContext = React.createContext()
// let DocSearchModal = null

export const useSearch = () => React.useContext(SearchContext)

export function SearchProvider({
  children,
  searchParameters = {
    hitsPerPage: 5,
  },
}) {
  const [isShowing, setIsShowing] = React.useState(false)

  const onOpen = React.useCallback(function onOpen() {
    // function importDocSearchModalIfNeeded() {
    //   if (DocSearchModal) {
    //     return Promise.resolve()
    //   }

    //   return import('@docsearch/react/modal').then(
    //     ({ DocSearchModal: Modal }) => (DocSearchModal = Modal)
    //   )
    // }

    // importDocSearchModalIfNeeded().then(() => {
      setIsShowing(true)
    // })
  }, [])

  const onClose = React.useCallback(() => setIsShowing(false), [])

  useDocSearchKeyboardEvents({
    isOpen: isShowing,
    onOpen,
    onClose,
  })

  const options = {
    appId: 'QEOOUNYNM3',
    apiKey: '8b9e78e4c9ed4f5435cea8048299da47',
    indexName: 'undefined',
    renderModal: true,
  }

  return (
    <>
      <SearchContext.Provider value={{ DocSearchModal, onOpen }}>
        {children}
      </SearchContext.Provider>

      {isShowing &&
        createPortal(
          <DocSearchModal
            {...options}
            searchParameters={searchParameters}
            onClose={onClose}
            navigator={{
              navigate({ suggestionUrl }) {
                console.log(suggestionUrl)
                // Router.push(suggestionUrl)
              },
            }}
            transformItems={items => {
              return items.map(item => {
                const url = new URL(item.url)
                return {
                  ...item,
                  url: item.url
                    .replace(url.origin, '')
                    .replace('#__next', '')
                    .replace('/docs/#', '/docs/overview#'),
                }
              })
            }}
            hitComponent={Hit}
          />,
          document.body
        )}
    </>
  )
}

function Hit({ hit, children }) {
  return (
    <Link href={hit.objectID}>
      <a>{children}</a>
    </Link>
  )
}