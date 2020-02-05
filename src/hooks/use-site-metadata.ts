import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      title: string
      titleAlt: string
      headline: string
      url: string
      description : string
      // siteLanguage: string
      // siteImage: string
      author: string
      [key: string]: unknown
    }
  }
}

const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          title
          titleAlt
          headline
          url
          description
          # siteLanguage
          # siteImage
          author
        }
      }
    }
  `)
  return data.site.siteMetadata
}

export default useSiteMetadata