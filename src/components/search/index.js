import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import StyledSearchBox from "./search-box"
import StyledSearchResult from "./search-result"
import Modal from 'react-modal';
import { useDocSearchKeyboardEvents } from '@docsearch/react'

Modal.setAppElement('body')
const customStyles = {
  content : {
    // top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, 0%)',
    border:  'none',
    padding: '0px',
    borderRadius: '1rem',
    width: '600px',
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  }
};
// import StyledSearchRoot from "./styled-search-root"
// import useClickOutside from "./use-click-outside"
const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}
const indices = [{ name: `undefined`, title: `undefined` }]

const SearchModal = React.memo(() => {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  // const [hasFocus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    // process.env.GATSBY_ALGOLIA_APP_ID,
    // process.env.GATSBY_ALGOLIA_SEARCH_KEY
    'QEOOUNYNM3',
    '8b9e78e4c9ed4f5435cea8048299da47'
  )
  const [modalIsOpen,setIsOpen] = React.useState(false);
  console.log('search', query)
  // useClickOutside(rootRef, () => setFocus(false))
  const onOpen = React.useCallback(function onOpen() {
    setIsOpen(true)
}, [])

const onClose = React.useCallback(() => setIsOpen(false), [])
  useDocSearchKeyboardEvents({
    isOpen: modalIsOpen,
    onOpen,
    onClose,
  })

  return (
    <>
      <div className="cursor-pointer flex items-center hover:text-pink-700 border-gray-300 rounded-md border-2 px-4" onClick={() => {setIsOpen(true)}}>
      <div className="mt-1"><svg t="1613317049323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1131" width="16" height="16"><path d="M400.696889 801.393778A400.668444 400.668444 0 1 1 400.696889 0a400.668444 400.668444 0 0 1 0 801.393778z m0-89.031111a311.637333 311.637333 0 1 0 0-623.331556 311.637333 311.637333 0 0 0 0 623.331556z" fill="currentColor" p-id="1132"></path><path d="M667.904 601.998222l314.766222 314.823111-62.919111 62.976-314.823111-314.823111z" fill="currentColor" p-id="1133"></path></svg></div>
       <div className="ml-2"> Quick search for anything
       
       </div>
       {/* <div
        className="flex items-center justify-center w-8 h-1/2 bg-gray-50 rounded-md border-gray-300 text-sm text-gray-400 cursor-pointer"
        style={{ borderWidth: 1 }}
        // onClick={onClose}
      >
        ctrl + k
      </div> */}
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => {setIsOpen(false)}}
      >
        <div className="rounded-full p-5" ref={rootRef}>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <StyledSearchBox onClose={onClose}/>
            <div className="w-full bg-gray-300 mb-5" style={{height: '0.1rem'}}></div>
            <StyledSearchResult
              indices={indices}
            />
          </InstantSearch>
        </div>
      </Modal>
    </>
  )
})

export { SearchModal }