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
            <div className="content__top">
              <p>I'm an open-source developer and the lead software engineer at <a href="https://vody.com" target="_blank">Vody</a>. If you have a non-profit or labor-focused software need, <a href="mailto:austin@jumanji.io?subject=Potential software project&body=Hi Austin,%0A%0AI'm reaching out on behalf of [you or your organization] for help with a project.%0A%0A[Briefly describe your needs here.]">let's talk about it.</a></p>
            </div>
            <div className="content__inner">{sections}</div>
          </div>
        </div>
      </Layout>
    )
  }
}

//mailto:hello@ind.ie?subject=Invitation%20to%20speak&body=Hey%20Aral%2C%0A%0AWe%E2%80%99d%20love%20to%20have%20you%20present%20a%20keynote%20at%20our%20event.%20The%20details%20are%20below%3A%20%0A%0AEvent%20name%3A%20%0ADate%3A%20%0ALocation%3A%0ATime%20of%20talk%20(if%20known)%3A%0AEstimated%20number%20of%20attendees%3A%20%0A%0AThis%20is%20for%20a%3A%0A%0A%5B%20%5D%20Commercial%2Findustry%20conference%20or%20exposition%0A%5B%20%5D%20Community%20conference%0A%5B%20%5D%20Not-for-profit%20conference%0A%5B%20%5D%20Local%20meet-up%0A%5B%20%5D%20A%20private%20company%20event%0A%5B%20%5D%20Other%3A%20(please%20specify)%0A%0AWe%20are%20happy%20to%3A%0A%0A%5B%20%5D%20Pay%20expenses%20(travel%2C%20hotel%2C%20etc.)%0A%5B%20%5D%20Pay%20an%20honorarium.%0A%5B%20%5D%20We%20can%E2%80%99t%20pay%20expenses%20or%20an%20honorarium%20but%20this%20is%20a%20community-run%20event%20where%20no%20one%20gets%20paid%20for%20their%20time%20organising%20or%20attending%20the%20event%20(please%20note%20that%20I%20can%20only%20do%20a%20very%20small%20number%20of%20pro-bono%20events%20and%20I%20will%20only%20consider%20local%20ones%20that%20do%20not%20involve%20travel%20time%20and%2For%20cost.)%0A%0A(The%20above%20sections%20are%20to%20save%20both%20of%20us%20time%20in%20quickly%20determining%20whether%20I%20am%20the%20right%20speaker%20for%20your%20event.%20Please%20feel%20free%20to%20add%20to%20this%20template%20as%20you%20see%20fit.%20I%20look%20forward%20to%20hopefully%20meeting%20you%20and%20talking%20at%20your%20event.)%0A

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
