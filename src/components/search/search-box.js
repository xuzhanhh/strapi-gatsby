import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus, onClose }) => (
    <div className="flex items-center mb-2">
      <div className="text-pink-700"><svg t="1613317049323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1131" width="16" height="16"><path d="M400.696889 801.393778A400.668444 400.668444 0 1 1 400.696889 0a400.668444 400.668444 0 0 1 0 801.393778z m0-89.031111a311.637333 311.637333 0 1 0 0-623.331556 311.637333 311.637333 0 0 0 0 623.331556z" fill="currentColor" p-id="1132"></path><path d="M667.904 601.998222l314.766222 314.823111-62.919111 62.976-314.823111-314.823111z" fill="currentColor" p-id="1133"></path></svg></div>
      <input
        className="SearchInput flex-1 ml-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <div
        className="flex items-center justify-center w-8 h-1/2 bg-gray-50 rounded-md border-gray-300 text-sm text-gray-400 cursor-pointer"
        style={{ borderWidth: 1 }}
        onClick={onClose}
      >
        esc
      </div>
    </div>
  )
)