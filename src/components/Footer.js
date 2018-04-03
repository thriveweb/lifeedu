import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.css'

export default ({ globalSettings }) => (
  <footer className='Footer'>
    <div className='Footer--Blue'>
      <div className='container taCenter'>
        {globalSettings.blueTitle && (
          <div>
            <h2>{globalSettings.blueTitle}</h2>
            <div className='Footer--Blue--dash' />
          </div>
        )}
        {globalSettings.blueMessage && (
          <p className='Footer--Blue--message'>{globalSettings.blueMessage}</p>
        )}
        {globalSettings.blueLinkURL && (
          <a href={`mailto:${globalSettings.blueLinkURL}`} className='Button'>
            Go to website
          </a>
        )}
      </div>
    </div>
    <div className='Footer--White'>
      <div className='container'>
        <div className='one-quarter'>Contact Us:</div>
        <div className='one-quarter'>
          <p>
            <a href={`mailto:${globalSettings.email}`}>
              {globalSettings.email}
            </a>
          </p>
          <p>
            <a href={`tel:${globalSettings.phone}`}>{globalSettings.phone}</a>
          </p>
        </div>
        <div className='one-quarter'>
          <p>{globalSettings.officeAddress}</p>
        </div>
        <div className='one-quarter FooterSocial'>
          {globalSettings.socialMediaCard.twitterURL && (
            <Link
              target='_blank'
              to={globalSettings.socialMediaCard.twitterURL}
            >
              <img src='/images/twitter.svg' alt='twitter' />
            </Link>
          )}
          {globalSettings.socialMediaCard.facebookURL && (
            <Link
              target='_blank'
              to={globalSettings.socialMediaCard.facebookURL}
            >
              <img src='/images/facebook.svg' alt='facebook' />
            </Link>
          )}
          {globalSettings.socialMediaCard.linkedinURL && (
            <Link
              target='_blank'
              to={globalSettings.socialMediaCard.linkedinURL}
            >
              <img src='/images/linkedin.svg' alt='linkedin' />
            </Link>
          )}
          {globalSettings.socialMediaCard.instagramURL && (
            <Link
              target='_blank'
              to={globalSettings.socialMediaCard.instagramURL}
            >
              <img src='/images/instagram.svg' alt='instagram' />
            </Link>
          )}
        </div>
      </div>
    </div>
  </footer>
)
