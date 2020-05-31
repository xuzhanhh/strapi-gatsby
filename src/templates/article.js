/** @jsx jsx */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/new-layout'
import ReactMarkdown from "react-markdown"
import { Helmet } from "react-helmet";
import { animated, useSpring, config } from "react-spring"
import { Container, Styled, jsx, Flex, useColorMode } from "theme-ui"
import Hero from '../components/hero';
import CodeBlock from '../components/code-block';
import Sticky from '../components/sticky';
import "../styles/global.css";
import { getAverageRGBFromImgsrc, rgbToHex } from '../utils'
import { borderColor } from 'polished'
import { tailwind } from "@theme-ui/presets";
import Markdown from '../components/markdown';

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
  const [colorMode, setColorMode] = useColorMode()
  const [titleList, setTitleList] = useState([]);
  const [activeTitle, _setActiveTitle] = useState(null);
  const setActiveTitle = React.useCallback((name, offset) => {
    if(typeof offset === 'number') {
     const newName = titleList[Math.max(titleList.findIndex( item => item.name === name) + offset, 0)].name
     _setActiveTitle(newName)
      return;
    }
    _setActiveTitle(name)
  }, [titleList])
  const addTitleList = React.useCallback((newItem) => {
    if (titleList.filter(item => item.key === newItem.key).length === 0) {
      setTitleList(origin => {
        origin.push(newItem)
        return [...origin]
      })
    }
  }, [titleList])
  const isDark = colorMode === `dark`
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })

  const [bgColor, setBgColor] = React.useState(null);
  React.useEffect(() => {
    if (data.strapiArticle.image) {
      getAverageRGBFromImgsrc(data.strapiArticle.image.childImageSharp.fluid.src).then(data => { setBgColor(`#${rgbToHex(data.r)}${rgbToHex(data.g)}${rgbToHex(data.b)}`) })
    }
  }, [])
  console.log('titleList', titleList);
  // const [titleLinkFixed, changeTitleLinkFixed] = useState(false);

  // const titleLinkRef = useRef();
  // useEffect(() => {
  //   const observer = new IntersectionObserver((data) => {
  //     const { isIntersecting, isVisible } = data[0]
  //     console.log('!!!!', isIntersecting, isVisible)
  //     changeTitleLinkFixed(isIntersecting)
  //   }, {
  //     threshold: 1,
  //     rootMargin: '-30px 0px 99999999px 0px'
  //   });
  //   observer.observe(titleLinkRef.current)
  //   return () => {
  //     observer.unobserve(titleLinkRef.current);
  //   }
  // }, []);
  const content = React.useMemo(()=>{
   return  <Markdown data={data.strapiArticle.content} addTitleList={addTitleList} setActiveTitle={setActiveTitle} />

  }, [data.strapiArticle.content, addTitleList])

console.log('active', activeTitle)

  return (
    <Layout
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.strapiArticle.title}</title>
      </Helmet>
      {data.strapiArticle.image && <Hero image={data.strapiArticle.image.childImageSharp.fluid} color={bgColor} >
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
            <div
              sx={{
                // borderRadius: 5,
                // padding: '10px 30px',
                // backgroundColor: isDark ? tailwind.colors.gray[7] : tailwind.colors.gray[1],
                // border: '1px solid',
                // borderColor: 'primary'
                // boxShadow: '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)'
              }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>



              {/* <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                <div>{data.strapiArticle.author.username}</div>
                <i>{data.strapiArticle.author.description}</i>
              </div> */}
            </div>
            <Styled.h1>{data.strapiArticle.title}</Styled.h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <blockquote sx={{ fontSize: '1.2rem', margin: '0 0 0 1.45rem', }}>{data.strapiArticle.description}</blockquote>
              <div sx={{ display: 'flex', alignItems: 'center' }}>
                {
                  data.strapiArticle.author.avatar && <Img style={{ width: 70, height: 70, borderRadius: 9999 }} fixed={data.strapiArticle.author.avatar.childImageSharp.fixed} />
                }
                <div style={{ marginLeft: 20 }}>
                  <div sx={{ marginRight: '1.45rem' }}>发布时间: {data.strapiArticle.created_at.split('T')[0]}</div>
                  <div sx={{ marginRight: '1.45rem' }}>修改时间: {data.strapiArticle.updated_at.split('T')[0]}</div>
                </div>

              </div>

            </div>
          </animated.div>
        </Flex>
      </Hero>
      }
      <Container sx={{ width: '70%', position: 'relative', }}>
        <animated.div style={contentProps}>

          <div sx={{ position: 'absolute', left: '-12vw', top: '4rem', }}>
            <Sticky>
              {
                ({ style }) => {
                  return (
                    <div id="test" style={{ ...style, width: '10rem', paddingTop: '3rem' }} >
                      {
                        titleList.map(title => {
                          return (
                            <div
                              key={title.key}
                              onClick={() => { setTimeout(() =>setActiveTitle(title.name), 100); window.location.hash = title.name }}
                              sx={{
                                cursor: 'pointer',
                                "&:hover": {
                                  color: `primary`,
                                },
                                marginBottom: '0.3rem',
                                // marginTop: '1rem',
                                transition: 'all 0.2s',
                                marginLeft: `${(title.level - 1) * 1.2}rem`,
                                color: activeTitle === title.name ? `primary`: null
                              }}
                            >
                              {title.name}
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              }
            </Sticky>
          </div>
          {content}
          {/* <ReactMarkdown
            renderers={{ image: Image }}
            source={transformArticle(data.strapiArticle.content)}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            escapeHtml={false}
            renderers={{ code: CodeBlock }}
          /> */}
          {/* <div></div> */}
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
      description
      created_at
      updated_at
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
        description
        avatar {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`