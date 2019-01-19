import React from 'react'
import {Link} from 'gatsby'
import './style.scss'

const HomeButton = () => (
  <div>
    <Link className="home-button" to="/">
      All Articles
    </Link>
  </div>
)

export default HomeButton
