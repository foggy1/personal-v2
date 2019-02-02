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
      <div className="post">
        <div style={{display: 'flex', flexDirection: 'row'}}className="post__title-row">
            <span className="post__meta-divider" />
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5d93ff', color: 'white', height: 48, width: 48, borderRadius: 50, paddingTop: 2}}>
            <i dangerouslySetInnerHTML={{ __html: feather.icons.calendar.toSvg({height: 36, width: 36, color: 'white'}) }} />
              <span style={{position: 'absolute', bottom: 7, left: 15}}>{moment(date).format('DD')}</span>
            </div>
            <time
              className="post__meta-time"
              dateTime={moment(date).format('MMMM D, YYYY')}
            />
          </span>
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
      </li>
    )
  }
}

export default Post
