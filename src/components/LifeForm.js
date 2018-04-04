import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './EnquiryForm.css'
import './LifeForm.css'

const fetch = window.fetch

class Form extends React.Component {
  static defaultProps = {
    title: '',
    name: 'neutral',
    subject: 'Kids project team', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your feedback, we will get back to you soon',
    noreplyMessage: 'Thanks for your feedback, we will take it as a comment',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false,
    agree: true
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        const message = this.state.agree
          ? this.props.successMessage
          : this.props.noreplyMessage
        form.reset()
        this.setState({
          alert: message,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render () {
    const { title, name, subject, action, className } = this.props
    return (
      <form
        className={`EnquiryForm LifeForm ${className}`}
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        {title && <h2 className='LifeForm--title'>{title}</h2>}
        {this.state.alert && (
          <div className='EnquiryForm--Alert'>{this.state.alert}</div>
        )}
        <label className='EnquiryForm--Label EnquiryForm--LabelHalf'>
          <input
            className='EnquiryForm--Input'
            type='text'
            placeholder='Name'
            name='name'
            required
          />
        </label>
        <label className='EnquiryForm--Label EnquiryForm--LabelHalf'>
          <input
            className='EnquiryForm--Input'
            type='email'
            placeholder='Email'
            name='email'
            required
          />
        </label>

        <label className='EnquiryForm--Label'>
          <textarea
            className='EnquiryForm--Input EnquiryForm--Textarea'
            placeholder='Your feedback'
            name='message'
            rows='10'
            required
          />
        </label>
        <label className='EnquiryForm--Label EnquiryForm--Label--agree'>
          <input
            className='EnquiryForm--Input EnquiryForm--Checkbox'
            type='checkbox'
            defaultChecked
            name='agree'
            onChange={e => this.setState({ agree: e.target.checked })}
          />I’m happy to be contacted by Life Education
        </label>
        <input type='text' name='_gotcha' style={{ display: 'none' }} />
        {!!subject && <input type='hidden' name='subject' value={subject} />}
        <input type='hidden' name='form-name' value={name} />
        <input
          className='Button EnquiryForm--SubmitButton'
          type='submit'
          value='Send feedback'
          disabled={this.state.disabled}
        />
      </form>
    )
  }
}

export default Form
