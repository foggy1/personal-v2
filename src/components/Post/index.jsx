import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'
import feather from 'feather-icons'

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
      <li value={moment(date).format('DD')}>
        <div style={{display: 'flex', flexDirection: 'row'}}className="post">
            <div className="post__meta">
            <span className="post__meta-category" key={categorySlug}>
              <Link to={categorySlug} className="post__meta-category-link">
                {category}
              </Link>
            </span>
          </div>
            <span className="post__meta-divider" />
          <h3 className="post__title">
          <span className="post__meta">
            <time
              className="post__meta-time"
              dateTime={moment(date).format('MMMM D, YYYY')}
            />
          </span>
            <Link className="post__title-link" to={slug}>
              {title}
            </Link>
          </h3>


      </div>
      </li>
    )
  }
}

export default Post
