import React from 'react'
import Papa from 'papaparse'
import FileSaver from 'file-saver'

import './Entries.css'

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

  CSVData ({ form, entryData }) {
    let csv = Papa.unparse(entryData)
    var blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8' })
    return FileSaver.saveAs(blob, form.title + '.csv')
  }

  render () {
    const { currentUser, forms } = this.state

    if (!currentUser) {
      return (
        <section className='section'>
          <div className='container'>Loading</div>
        </section>
      )
    }

    // const currentForm = JSON.stringify(form.entries, null, 2)

    return (
      <section className='section Entries'>
        <div className='container Entries--container'>
          {(forms || []).map(form => {
            const entryData = form.entries.map(
              ({ human_fields: humanFields, created_at: date, ...entry }) => ({
                ...humanFields,
                date
              })
            )
            return (
              <div key={form.formID} className='Entries--one-third'>
                <h4 className='Entries--title'>{form.title}</h4>
                <div className='Entries--total'>{form.entries.length}</div>
                <a
                  className='Button-outline'
                  onClick={() => this.CSVData({ form, entryData })}
                  href='#'
                >
                  Download CSV
                </a>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export default Entries
