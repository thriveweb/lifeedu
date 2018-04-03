import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content.js'
import FormSwitch from '../components/FormSwitch.js'
import './FormTemplate.css'

export default ({ page }) => (
  <div className='FormTemplate'>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
    <div className='section thin'>
      <div className='container'>
        <Content source={page.content} />
        {page.audio && (
          <audio controls>
            <source src={page.audio} type='audio/mpeg' />
          </audio>
        )}
        <div className='container skinny'>
          <FormSwitch page={page} />
        </div>
      </div>
    </div>
  </div>
)
