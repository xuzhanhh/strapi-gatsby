// const escapeStringRegexp = require("escape-string-regexp")
// const pagePath = `content`
// const indexName = `Pages`
console.log('??????, in algolia queries')
const pageQuery = `{
   allStrapiArticle {
    edges {
      node {
        id
        section {
          title
          id
        }
        title
        score_desc
        description
        content
      }
    }
  }
}`
function pageToAlgoliaRecord({ node: { id, section, title, ...rest } }) {
  // TODO: 暂时不搜索 content
  return {
    objectID: section.title + '/' + (10000 + parseInt(id.split('_')[1])),
    'categories': {
      'lvl0': 'blog',
      'lvl1': section.title
    },
    name: title,
    ...rest,
  }
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => { console.log('!!!~~~~', JSON.stringify(data.allStrapiArticle.edges)); debugger; return data.allStrapiArticle.edges.map(pageToAlgoliaRecord) },
    // settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
module.exports = queries