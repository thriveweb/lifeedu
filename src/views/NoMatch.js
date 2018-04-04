import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './NoMatch.css'

const NoMatch = ({ siteUrl }) => (
  <Helmet>
    <title>404 – Page Not Found</title>
    <body className='body--NoMatch' />
  </Helmet>
)

NoMatch.propTypes = {
  siteUrl: PropTypes.string.isRequired
}

export default NoMatch
