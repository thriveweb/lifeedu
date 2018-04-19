import React from 'react'

import LifeForm from './LifeForm'
import LifeFormHappy from './LifeFormHappy'
import './FormSwitch.css'

class FormSwitch extends React.Component {
  static defaultProps = {
    status: 'happy'
  }

  state = {
    status: '',
    activeItem: 0
  }

  handleClick = index => {
    this.setState({ activeItem: index })
  }

  render () {
    const { activeItem } = this.state
    const { page } = this.props
    return (
      <main>
        <div className='FormSwitch'>
          <div
            className={`happy tacenter FormSwitch--option ${
              activeItem === 1 ? 'active' : ''
            }`}
            onClick={() => this.handleClick(1)}
          >
            <img
              className='FormSwitch--image'
              src='/images/happy.svg'
              alt='happy'
            />
            <div className='Button-outline'>Happy</div>
          </div>
          <div
            className={`neutral tacenter FormSwitch--option ${
              activeItem === 2 ? 'active' : ''
            }`}
            onClick={() => this.handleClick(2)}
          >
            <img
              className='FormSwitch--image'
              src='/images/neutral.svg'
              alt='neutral'
            />
            <div className='Button-outline'>Neutral</div>
          </div>
          <div
            className={`sad tacenter FormSwitch--option ${
              activeItem === 3 ? 'active' : ''
            }`}
            onClick={() => this.handleClick(3)}
          >
            <img
              className='FormSwitch--image'
              src='/images/sad.svg'
              alt='sad'
            />
            <div className='Button-outline'>Sad</div>
          </div>
        </div>
        <div className='FormResults'>
          {activeItem === 1 &&
            page.happyMessage && (
              <div className='FormResults-result'>
                {page.happyMessage}
                <LifeForm title={page.formTitle} name='happy' />
              </div>
            )}
          {activeItem === 2 &&
            page.neutralMessage && (
              <div className='FormResults-result'>
                {page.neutralMessage}
                <LifeForm title={page.formTitle} name='neutral' />
              </div>
            )}
          {activeItem === 3 &&
            page.sadMessage && (
              <div className='FormResults-result'>
                {page.sadMessage}
                <LifeForm title={page.formTitle} name='sad' />
              </div>
            )}
        </div>
      </main>
    )
  }
}

export default FormSwitch
