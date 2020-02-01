import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import "../styles/global.css"  
const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ul>
        {data.allStrapiArticle.edges.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/${document.node.id}`}>{document.node.title}</Link>
            </h2>
            <Image fixed={document.node.image.childImageSharp.fixed} />
            <ReactMarkdown
              source={document.node.content.substring(0, 500).concat("...")}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className="indexArticle"
            />
          </li>
        ))}
      </ul>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}
export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`
export default IndexPage
