import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link} from 'gatsby'

import Header from './header'
import './layout.css'

const Listing = ({ children }) => (
  <StaticQuery
    query={graphql`
      query PostQuery {
        allHubspotPost(limit: 10) {
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
      }
    `}
    render={data => (
      <>
        <Helmet
          title="hs blog"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle='HubSpot Blog Listing' />
        {data.allHubspotPost.edges.map(post => {
          return(
            <div style={{border: "1px solid #ccc", padding: "25px", marginTop: "10px"}}>
              <Link to={`/${post.node.slug}/`}>
                <h4>{post.node.title}</h4>
                </Link>
              <p>By: {post.node.author.full_name}</p>
              <img src={post.node.feature_image.url} alt={post.node.feature_image.alt}/>
              <div dangerouslySetInnerHTML={{__html: post.node.summary}}></div>
            </div>
          )
        })}
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Listing.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Listing
