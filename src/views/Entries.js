import React from 'react'

class Entries extends React.Component {
  state = {
    currentUser: null,
    entries: null
  }

  componentDidMount = () => {
    this.checkAuth()
  }

  checkAuth = () => {
    const { netlifyIdentity } = window

    if (!netlifyIdentity) {
      window.location = '/admin'
    }

    netlifyIdentity.on('init', user => {
      if (!user) {
        window.location = '/admin'
      }
      netlifyIdentity.currentUser().jwt()
      this.setState(
        {
          currentUser: netlifyIdentity.currentUser()
        },
        this.fetchEntries
      )
    })
  }

  fetchEntries = () => {
    const { currentUser } = this.state

    console.log(currentUser)

    if (!currentUser || !currentUser.token) return false

    const { token, url } = currentUser

    fetch(`/.netlify/functions/formsubmissions`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        url
      })
    })
      .then(res => res.json())
      .then(({ forms }) => this.setState({ forms }))
  }

  render () {
    const { currentUser, forms } = this.state

    console.log(forms)
    if (!currentUser) {
      return (
        <section className='section'>
          <div className='container'>Loading</div>
        </section>
      )
    }

    return (
      <section className='section'>
        <div className='container'>
          {(forms || []).map(form => (
            <div key={form.id}>
              <h4>{form.id}</h4>
              <pre>
                <code>{JSON.stringify(form.entries, null, 2)}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Entries
