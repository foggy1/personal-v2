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
      <div className="post">
        <div className="post__title-row">
            <time
              className="post__meta-time"
              dateTime={moment(date).format('MMMM D, YYYY')}
              style={{position: 'relative'}}
            >
              <i dangerouslySetInnerHTML={{ __html: feather.icons.calendar.toSvg({height: 36, width: 36, color: 'white', zIndex: 10}) }} />
              <span style={{position: 'absolute', bottom: 5, left: 12, backgroundColor: '#5d93ff', color: 'white', lineHeight: '40px', width: 40, borderRadius: 50, textAlign: 'center'}}>{moment(date).format('DD')}</span>
            </time>
            <span classNme="post__meta-divider" />
          <h3 className="post__title">
            <Link className="post__title-link" to={slug}>
              {title}
            </Link>
          </h3>
          {/*            <div className="post__meta">
            <span className="post__meta-category" key={categorySlug}>
              <Link to={categorySlug} className="post__meta-category-link">
                {category}
              </Link>
            </span>
          </div>*/}
        </div>
        <p className="post__description">{description}</p>
      </div>
    )
  }
}

export default Post
