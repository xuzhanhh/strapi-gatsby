import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
  connectHits,
} from "react-instantsearch-dom"
import './search-result.css'
const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits
  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})
const PageHit = ({ hit }) => {
  console.log('PageHit', hit)
  return (
    <Link to={hit.objectID}>
      <div className="search-result flex items-center h-14 rounded-xl bg-gray-100 hover:bg-pink-600 hover:text-white">
        <div className="ml-4  flex items-center">

          <span className="text-sm font-semibold">
            {/* {
          hit.name
        } */}
            <Highlight attribute="name" hit={hit} tagName="mark" />
          </span>
          <Snippet attribute="content" hit={hit} tagName="mark" />
        </div>
      </div>
    </Link>
  )
}
const MyHits = ({ hits }) => (
  <div className="mb-4">
    {hits.slice(0, 5).map(hit => (
      <div className="mt-2">
        <PageHit hit={hit} />
      </div>
    ))}
  </div>
);
const CustomHits = connectHits(MyHits);
const Result = connectStateResults(
  ({ searchState }) => {
    return searchState && searchState.query ? (
      <CustomHits className="Hits" hitComponent={PageHit} />
    ) : null
  }
)
const HitsInIndex = ({ index }) => {

  return (
    <Index indexName={index.name}>
      <Result />
    </Index>
  )
}
const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)
export default SearchResult