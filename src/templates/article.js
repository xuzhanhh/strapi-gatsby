/** @jsx jsx */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/new-layout'
import ReactMarkdown from "react-markdown"
import { animated, useSpring, config } from "react-spring"
import { Container, Styled, jsx, Flex } from "theme-ui"
import Hero from '../components/hero';
import CodeBlock from '../components/code-block';
import "../styles/global.css";
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
// require('string.prototype.matchall')
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

const Page = ({ data }) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })
  function Image(props) {
    return <img {...props} style={{ maxWidth: '100%' }} />
  }
  const transformArticle = (data) => {
    const ret = data.replaceAll(/<img src=\"https:\/\/res.cloudinary.com\/dfafucj5l\/image\/upload\/v\d+\/ac\/(.*?).png" \/>/, (...data) => {
      return data[0].substr(0, data[0].length - 2) + `style="width:70px;" />`
    })
    return ret
  }
  return (
    <Layout
    >
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
            renderers={{ image: Image }}
            source={transformArticle(data.strapiArticle.content)}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            escapeHtml={false}
            renderers={{ code: CodeBlock }}
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