/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { animated } from "react-spring"
import { ChildImageSharp } from "../types"

type Props = {
  node: {
    color: string
    title: string
    slug: string
    service: string
    client: string
    cover: ChildImageSharp
  }
  style?: any
}

const ProjectItem = ({ node, style }: Props) => {
  return (
    <animated.div
      sx={{
        position: `relative`,
        "&:before": {
          content: `""`,
          display: `block`,
          paddingTop: `100%`,
        },
      }}
      style={style}
    >
      <div
        sx={{
          left: 0,
          height: `100%`,
          position: `absolute`,
          top: 0,
          width: `100%`,
          a: {
            color: `white`,
            height: `100%`,
            left: 0,
            opacity: 0,
            padding: 4,
            position: `absolute`,
            top: 0,
            width: `100%`,
            zIndex: 10,
            transition: `all 0.3s ease-in-out`,
            textDecoration: `none`,
            "&:hover": {
              color: `white`,
              opacity: 1,
              textDecoration: `none`,
            },
          },
        }}
      >
        <div
          sx={{
            "> div": {
              height: `100%`,
              left: 0,
              position: `absolute !important`,
              top: 0,
              width: `100%`,
              "> div": {
                position: `static !important`,
              },
            },
          }}
        >
          {node.image  && <Img fluid={node.image.childImageSharp.fluid} />}
        </div>
        <Link to={`/${node.section.title}/${node.strapiId || node.id}`} aria-label={`View detail page of ${node.title}`}>
          <img
            alt=""
            src={node.image && node.image.childImageSharp.fluid.tracedSVG}
            sx={{
              position: `absolute`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: `100%`,
              height: `100%`,
              filter: `invert(100%)`,
              zIndex: -1,
              opacity: 0.08,
              objectFit: `cover`,
            }}
          />
          <div
            sx={{
              backgroundColor: '#bdeefe',
              height: `100%`,
              left: 0,
              position: `absolute`,
              top: 0,
              width: `100%`,
              zIndex: -2,
            }}
          />
          <div sx={{ fontSize: 5, fontWeight: `bold` }}>{node.title}</div>
          {/* <div sx={{ fontSize: 2 }}>{node.content}</div> */}
        </Link>
      </div>
    </animated.div>)
}

export default ProjectItem
