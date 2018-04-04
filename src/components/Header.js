import React from 'react'
import './Header.css'

export default () => (
  <header className='Header'>
    <div className='relative Header--image container'>
      <img className='large' src='/images/header.png' alt='life edu' />
      <img className='small' src='/images/header-mobile.png' alt='life edu' />
    </div>
  </header>
)
