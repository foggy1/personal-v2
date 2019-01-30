import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello-771c82e0/css/fontello.css'
import feather from 'feather-icons'
class Links extends React.Component {
  render() {
    const author = this.props.data
    const links = {
      telegram: author.telegram,
      twitter: author.twitter,
      github: author.github,
      vk: author.vk,
      rss: author.rss,
      email: author.email,
    }

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a href={`https://www.github.com/${links.github}`} target="_blank">
              <i dangerouslySetInnerHTML={{ __html: feather.icons.github.toSvg({height: 36, width: 36}) }} />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`mailto:${links.email}`}>
              <i dangerouslySetInnerHTML={{ __html: feather.icons.mail.toSvg({height: 36, width: 36}) }} />
            </a>
          </li>
          <li className="links__list-item">
            <a href={links.rss}>
              <i dangerouslySetInnerHTML={{ __html: feather.icons.rss.toSvg({height: 36, width: 36}) }} />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Links
