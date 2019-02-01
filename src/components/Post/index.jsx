import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields

    return (
      <div className="post">

          <h3 className="post__title">
          <span className="post__meta">
            <time
              className="post__meta-time"
              dateTime={moment(date).format('MMMM D, YYYY')}
            >
              {moment(date).format('DD')}
            </time>
            <span className="post__meta-divider" />
          </span>
            <Link className="post__title-link" to={slug}>
              {title}
            </Link>
          </h3>
            <div className="post__meta">
            <span className="post__meta-category" key={categorySlug}>
              <Link to={categorySlug} className="post__meta-category-link">
                {category}
              </Link>
            </span>
          </div>

        <p className="post__description">{description}</p>
      </div>
    )
  }
}

export default Post
