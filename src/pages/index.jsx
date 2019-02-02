import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import moment from 'moment'
// import Header from '../components/Header'
class IndexRoute extends React.Component {
  render() {
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const groups = this.props.data.allMarkdownRemark.group
    const sections = groups.map(({fieldValue, edges: posts}) => (
      <div>
        <h2>{moment(fieldValue).format('MMMM YYYY')}</h2>
        <ol>
          {posts.map(post => (
            <Post data={post} key={post.node.fields.slug} />
        ))}
        </ol>
      </div>
    )).reverse()

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
          <div className="content">
            <div className="content__inner">{sections}</div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          github
          rss
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      group(field: fields___month_stamp) {
        fieldValue
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
      }
    }
  }
`
