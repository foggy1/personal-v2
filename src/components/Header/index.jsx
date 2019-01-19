import React, {Component} from 'react'
import Links from '../Links'
class Header extends Component {
  render () {
    return (
      <header style={{marginTop: 56, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{marginTop: 'auto', fontSize: 64}}>Austin Lanari</h1>
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
}

export default Header
