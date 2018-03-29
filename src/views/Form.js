import React from 'react'
import Helmet from 'react-helmet'

import LazyImage from '../components/LazyImage'
import Content from '../components/Content.js'
import './About.css'

export default ({ page }) => (
  <div className='About'>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
    <div className='section thin'>
      <div className='container'>
        Form
        <Content source={page.section1} />
      </div>
    </div>
    <div className='section thin'>
      <div className='container'>
        <Content source={page.section2} />
        <p>The image below is a {'<LazyImage />'}</p>
        <LazyImage src={page.featuredImage} alt='LazyImage' />
      </div>
    </div>
  </div>
)
