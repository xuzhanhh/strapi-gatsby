import * as React from 'react';
import ReactMarkdown from "react-markdown"
import { Container, Styled, jsx, Flex, useColorMode } from "theme-ui"
import CodeBlock from '../components/code-block';

function Image(props) {
  return <img {...props} style={{ maxWidth: '100%' }} />
}

const Markdown = ({data}) => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`
  const transformArticle = (data) => {
    const ret = data.replaceAll(/<img src=\"https:\/\/res.cloudinary.com\/dfafucj5l\/image\/upload\/v\d+\/ac\/(.*?).png" \/>/, (...data) => {
      return data[0].substr(0, data[0].length - 2) + `style="width:70px; filter:invert(${isDark ? 0.9 : 0})" />`
    })
    return ret
  }
 
  return (
    <ReactMarkdown
      source={transformArticle(data)}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
      escapeHtml={false}
      renderers={{ code: CodeBlock, image: Image }}
    />
  )
}

export default Markdown;
