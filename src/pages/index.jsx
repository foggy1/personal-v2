import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import moment from 'moment'
// import Header from '../components/Header'
class IndexRoute extends React.Component {
  render() {
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const groups = this.props.data.allMarkdownRemark.group
    const image = this.props.data.imageSharp.fixed
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
            <div className="content__top">
              <p>I'm an open-source developer and the lead software engineer at <a href="https://vody.com" target="_blank">Vody</a>. If you have a non-profit or labor-focused software need, <a href="mailto:austin@jumanji.io?subject=Potential software project&body=Hi Austin,%0A%0AI'm reaching out on behalf of [you or your organization] for help with a project.%0A%0A[Briefly describe your needs here.]">let's talk about it.</a></p>
              <Img style={{margin: "0 auto", display: 'block'}}className="content__top__image" fixed={image} />
            </div>
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
    imageSharp(original:{src: {regex: "/\/static\/me_and_rothko-/"}}) {
      fixed(width: 340) {
        ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
