import fetch from 'node-fetch'
require('dotenv').config({ path: '.env.local' })

const forms = [
  '5ac46bf6494c584a01a742a0',
  '5ac40fd88c8f337729f9a1bf',
  '5ac32645ae529019e141a487'
]

const siteUrl = 'https://lifeedu.netlify.com'
const endpoint = ({ token, formID }) =>
  `https://api.netlify.com/api/v1/forms/${formID}/submissions/?access_token=${token}`

const fetchForms = ({ token }) =>
  Promise.all(
    forms.map(formID =>
      fetch(endpoint({ token, formID }))
        .then(res => res.json())
        .then(data => ({
          id: formID,
          entries: data
        }))
    )
  )

export function handler (event, context, callback) {
  const createError = error => {
    console.log(error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error })
    })
  }

  if (!process.env.REACT_APP_NETLIFY_PAT) {
    return createError('Need personal access token')
  }

  if (event.httpMethod !== 'POST') {
    return createError('Method not allowed')
  }

  const data = JSON.parse(event.body)
  console.log(data)
  const { token, url } = data

  if (!token || !url) {
    return createError('Missing required data')
  }

  fetch(`${siteUrl + url}/user`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.code) {
        console.log('ERROR')
        console.log(data)

        callback(null, {
          statusCode: data.code,
          body: JSON.stringify(data)
        })
        return data
      }
      return data
    })
    .then(data => {
      fetchForms({ token: process.env.REACT_APP_NETLIFY_PAT }).then(
        formDataArr => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ forms: formDataArr, data })
          })
        }
      )
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err)
      })
    })
}
