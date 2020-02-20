const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            strapiId
            id
            section {
              title
            }
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.section.title}/${10000 + node.strapiId}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  const getSections = makeRequest(graphql, `
    {
      allStrapiSection {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `).then(result => {
    result.data.allStrapiSection.edges.forEach(({ node }) => {
      console.log('!!!', node)
      createPage({
        path: `/${node.title}`,
        component: path.resolve(`src/templates/section.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
  // const getAuthors = makeRequest(graphql, `
  //   {
  //     allStrapiUser {
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  //   `).then(result => {
  //   // Create pages for each user.
  //   result.data.allStrapiUser.edges.forEach(({ node }) => {
  //     createPage({
  //       path: `/authors/${node.id}`,
  //       component: path.resolve(`src/templates/author.js`),
  //       context: {
  //         id: node.id,
  //       },
  //     })
  //   })
  // });

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getSections,
    // getAuthors,
  ])
};