/** @jsx jsx */
import { jsx, Container, Styled } from "theme-ui"
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import Page from '../components/page';
import ProjectItem from '../components/project-item'
import NewLayout from '../components/new-layout';
import "../styles/global.css"
const IndexPage = ({ data }) => {
  console.log(data)
  return (
    // <Layout>
    //   <h1>Hi people</h1>
    //   <p>Welcome to your new Gatsby site.</p>
    //   <p>Now go build something great.</p>
    //   <ul>
    <NewLayout
      sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        width: `100%`,
        // height: '100vh'
      }}
    >
      {data.allStrapiArticle.edges.map(document => (
        <ProjectItem node={document.node} />
      ))}
    </NewLayout>
    //   </ul>
    //   <Link to="/page-2/">Go to page 2</Link>
    // </Layout>
  )
}
export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          strapiId
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          section {
            title
          }
          title
          content
        }
      }
    }
  }
`
export default IndexPage
{/* <li key={document.node.id}>
            <h2>
              <Link to={`/${document.node.id}`}>{document.node.title}</Link>
            </h2>
            {document.node.image && <Image fixed={document.node.image.childImageSharp.fixed} />}
            <ReactMarkdown
              source={document.node.content.substring(0, 500).concat("...")}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className="indexArticle"
              escapeHtml={false}
            />
          </li> */}