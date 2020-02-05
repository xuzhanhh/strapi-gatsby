/** @jsx jsx */
import * as React from 'react'
import { animated, useSpring, config } from "react-spring"
import { Container, Styled, jsx, Flex } from "theme-ui"
import Hero from "./hero"

const Page = ({ page }) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <div>
      {page.image && <Hero image={page.image} slim >
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
            <Styled.h1>{page.title}</Styled.h1>
          </animated.div>
        </Flex>
      </Hero>
      }
      {/* <Container>
        <animated.div style={contentProps}>
          6666
        </animated.div>
      </Container> */}
    </div>
  )
}

export default Page