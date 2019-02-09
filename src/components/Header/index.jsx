import React, {Component} from 'react'
import Links from '../Links'
import './style.scss'
class Header extends Component {
  render () {
    return (
      <header className='header' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className='header__title' style={{marginTop: 'auto'}}>Austin Lanari</h1>
        <Links data={author} />
      </header>
    )
  }
}

const author = {
  name: 'Austin Lanari',
  email: 'austin@jumanji.io',
  github: 'foggy1',
  rss: '/rss.xml',
  xmpp: 'foggy@jumanji.io'
}

export default Header
