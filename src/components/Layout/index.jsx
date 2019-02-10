import React from 'react'
import Helmet from 'react-helmet'
import Header from '../Header'
import Footer from '../Footer'
require("typeface-roboto")
import '../../assets/scss/init.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Header />
        <Helmet defaultTitle="Austin Lanari" />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Layout
