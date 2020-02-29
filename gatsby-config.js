module.exports = {
  siteMetadata: {
    titleAlt: 'My super blog',
    headline: 'My super blog',
    url: 'My super blog',
    description: 'My super blog',
    author: 'Strapi team',
    title: 'Mimigon'
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: '@xuzhanhh/gatsby-source-strapi',
      options: {
        apiURL: process.env.DEPLOY_URL
          ? "http://3.113.13.44:1337"
          : "http://localhost:1337",
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          'article',
          'user',
          'section',
          'about'
        ],
        queryLimit: 1000,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'mimigon',
        short_name: 'mimigon',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/mimigonlogo_raw.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}