import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content.js'
import './Page.css'

export default ({ page }) => (
  <div className='About'>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>

    <div className='section thin'>
      <div className='container'>
        <Content source={page.content} />
      </div>
    </div>
  </div>
)
