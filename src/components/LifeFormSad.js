import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './EnquiryForm.css'
import './LifeForm.css'

const fetch = window.fetch

class FormSad extends React.Component {
  static defaultProps = {
    title: '',
    name: 'sad',
    subject: 'Kids project team', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your feedback, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
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
        form.reset()
        this.setState({
          alert: this.props.successMessage,
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
    const { title, name, subject, action } = this.props
    return (
      <form
        className='EnquiryForm LifeForm LifeFormSad'
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        <input type='hidden' name='form-name' value='sad' />
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
        <label className='EnquiryForm--Label'>
          <input
            className='EnquiryForm--Input EnquiryForm--Checkbox'
            type='checkbox'
            defaultChecked
            name='agree'
          />I’m happy to be contacted by Life Education
        </label>
        <input type='text' name='_gotcha' style={{ display: 'none' }} />
        {!!subject && <input type='hidden' name='subject' value={subject} />}
        <input type='hidden' name='form-name' value={name} />
        <input
          className='Button EnquiryForm--SubmitButton'
          type='submit'
          value='Enquire'
          disabled={this.state.disabled}
        />
      </form>
    )
  }
}

export default FormSad
