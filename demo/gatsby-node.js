const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `HubspotPost`) {
//     console.log(node)
//     // const slug = createFilePath({node, getNode, basePath: `posts`});
//     // console.log(slug);
//     // createNodeField({
//     //   node,
//     //   name: `slug`,
//     //   value: slug
//     // })
//   }
// };

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {allHubspotPost {
        edges {
          node {
            id,
            title,
            body,
            state,
            author {
              id,
              name,
              full_name,
              bio,
              email,
              facebook,
              google_plus,
              linkedin,
              twitter,
              twitter_username,
              website,
              slug
            },
            feature_image {
              url,
              alt_text
            },
            meta {
              title,
              description
            },
            summary,
            published,
            updated,
            created,
            slug
          } 
        }
      }
    }`).then(result => {
      result.data.allHubspotPost.edges.forEach(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/components/post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.slug,
            body: node.body,
            title: node.title,
            author: {
              id: node.author.id,
              full_name: node.author.full_name,
              email: node.author.email
            },
            published: node.published
          },
        })
      })
      resolve()
    })
  })
}