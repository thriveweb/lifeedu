import React from 'react'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className='Footer'>
    <div className='Footer--Blue'>
      <div className='container taCenter'>
        <h2>Visit Life Education website</h2>
        <div className='Footer--Blue--dash' />
        <p>
          And learn more about our program orem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
        </p>
        <a href='http://google.com' className='Button'>
          Go to website
        </a>
      </div>
    </div>
    <div className='Footer--White'>
      <div className='container'>
        <div className='one-quarter'>Contact Us:</div>
        <div className='one-quarter'>
          <p>
            <a href='mailto:qld@lifeeducation.org.au'>
              qld@lifeeducation.org.au
            </a>
          </p>
          <p>
            <a href='tel:1300 427 653'>1300 427 653</a>
          </p>
        </div>
        <div className='one-quarter'>
          <p>
            89 Sunshine Boulevard <br />
            Broadbeach QLD 4218
          </p>
        </div>
        <div className='one-quarter'>facebook</div>
      </div>
    </div>
  </footer>
)
