import React from 'react'
import Post from '../Post'
import HomeButton from '../HomeButton'
class TagTemplateDetails extends React.Component {
  render() {
    const items = []
    const tagTitle = this.props.pageContext.tag
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <div className="content">
        <HomeButton />
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              All Posts tagged as &quot;
              {tagTitle}
              &quot;
            </h1>
            <div style={{paddingLeft: 25}} className="page__body">{items}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TagTemplateDetails
