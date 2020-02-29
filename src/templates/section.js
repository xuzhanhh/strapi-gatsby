/** @jsx jsx */
import { jsx, Container, Styled } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet";
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
    >
      {/* <Helmet>
          <meta charSet="utf-8" />
          <title>{data.strapiSection.title}</title>
        </Helmet> */}
      <div sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        width: `100%`,
        // height: '100vh'
      }}>

        {data.strapiSection.articles.map(document => (
          <ProjectItem node={{ ...document, section: { title: data.strapiSection.title, id: data.strapiSection.id } }} />
        ))}
      </div>
    </NewLayout>
    //   </ul>
    //   <Link to="/page-2/">Go to page 2</Link>
    // </Layout>
  )
}

export const query = graphql`  
query IndexSectionQuery($id: String!) {
  strapiSection(id: {eq: $id}) {
    id
    title
    description
    articles {
      id
      image {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      content
    }
  }
}
`

export default IndexPage