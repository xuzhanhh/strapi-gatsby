import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/new-layout'
import ReactMarkdown from "react-markdown"
import { animated, useSpring, config } from "react-spring"
import { Container, Styled, jsx, Flex } from "theme-ui"
import Hero from '../components/hero';
// const ArticleTemplate = ({ data }) => (
//   <Layout>
//     <h1>{data.strapiArticle.title}</h1>
//     <p>by <Link to={`/authors/User_${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
//     {data.strapiArticle.image && <Img fluid={data.strapiArticle.image.childImageSharp.fluid} />}
//     <ReactMarkdown
//       source={data.strapiArticle.content}
//       transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
//       escapeHtml={false}
//     />
//   </Layout>
// )
const Page = ({ data }) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })
  console.log(data.strapiArticle);
  return (
    <Layout>
      {data.strapiArticle.image && <Hero image={data.strapiArticle.image.childImageSharp.fluid} slim >
        <Flex
          sx={{
            position: `absolute`,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: `5xl`,
            margin: `0 auto`,
            padding: 4,
            zIndex: 2,
            flexDirection: `column`,
          }}
        >
          <animated.div style={titleProps}>
            <Styled.h1>{data.strapiArticle.title}</Styled.h1>
          </animated.div>
        </Flex>
      </Hero>
      }
      <Container>
        <animated.div style={contentProps}>
          <ReactMarkdown
            source={data.strapiArticle.content}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            escapeHtml={false}
          />
        </animated.div>
      </Container>
    </Layout>
  )
}
export default Page;

export const query = graphql`  
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      content
      image {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        id
        username
      }
    }
  }
`