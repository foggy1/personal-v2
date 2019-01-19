import React from 'react'
import profilePic from '../../pages/photo.jpg'
import './style.scss'

class Footer extends React.Component {
  render() {
    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div>
          <div
            style={{overflow: 'hidden', width: 75, height: 75}}
            className="sidebar__author-photo"
          >
            <img
              src={profilePic}
              alt='Austin Lanari'
            />
          </div>
          <h2 className="sidebar__author-title">
            About the Author
          </h2>
        <p className="sidebar__author-subtitle">Here is some text about some things that exist on the planet.</p>
      </div>
    )
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="sidebar">
        <hr />
        <div className="sidebar__inner">
          <div className="sidebar__author">{authorBlock}</div>
          <div>
            <p className="sidebar__copyright">© 2019 Austin Lanari</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
