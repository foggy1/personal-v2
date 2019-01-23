import React from 'react'
import profilePic from '../../pages/photo.jpg'
import './style.scss'

class Footer extends React.Component {
  render() {
    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div style={{display: 'flex', flexDirection: 'row'}}>
          <div
            style={{overflow: 'hidden', minWidth: 100, minHeight: 100, height: 100, width: 100}}
            className="footer__author-photo"
          >
            <img
              src={profilePic}
              alt='Austin Lanari'
            />
          </div>
          <div style={{flexDirection: 'column', marginLeft: 20}}>
            <h2 style={{marginTop: 0}} className="footer__author-title">
              About the Author
            </h2>
            <p className="footer__author-subtitle"><em>I am a developer and an advocate of open, accessible solutions. I'm the the lead engineer at <a href='https://vody.com/' target='_blank'>Vody</a> where I help design and implement robust systems to help quiet the waters of streaming media metadata.</em></p>
            <p style={{marginTop: -5}}className="footer__author-subtitle"><em>I also <a href="https://fuckupsomecomics.com" target="_blank">write about comics</a> and consult with small non-profits and labor organizations about their tech needs.</em></p>
            <p style={{marginTop: -5}}className="footer__author-subtitle"><em>If you are in need of an extra pair of eyes on something, <a href="mailto:austin@jumanji.io">let's chat.</a></em></p>
          </div>
      </div>
    )
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="footer">
        <hr style={{marginBottom: 20}}/>
        <div className="footer__inner">
          <div className="footer__author">{authorBlock}</div>
          <div>
            <p className="footer__copyright">Copyright © 2019 Austin Lanari. <a href='https://github.com/foggy1/personal-v2' target='_blank'>Source code.</a> Page content is licensed <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>CC BY-SA 4.0</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
