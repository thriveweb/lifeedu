import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import _merge from 'lodash/merge'
import _kebabCase from 'lodash/kebabCase'

import Meta from './components/Meta'
import Page from './views/Page'
import Entries from './views/Entries'
import FormTemplate from './views/FormTemplate'
import ComingSoon from './views/ComingSoon'
import NoMatch from './views/NoMatch'
import Header from './components/Header'
import Footer from './components/Footer'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import Spinner from './components/Spinner'
import data from './data.json'

class App extends Component {
  state = {
    data,
    loading: false
  }

  componentDidMount = () => {
    this.fetchPreviewContent()
  }

  fetchPreviewContent = () => {
    if (
      !window.netlifyIdentity ||
      !window.netlifyIdentity.currentUser() ||
      process.env.NODE_ENV === 'development'
    ) {
      return false
    }
    import('./util/fetch-content').then(({ fetchContent }) => {
      this.setState({ loading: true })
      fetchContent()
        .then(newData => {
          this.setState(prevState => {
            const data = _merge(prevState.data, newData)
            return { data, loading: false }
          })
        })
        .catch(() => this.setState({ loading: false }))
    })
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection]

  render () {
    const globalSettings = this.getDocument('settings', 'global')
    const { siteTitle, headerScripts, siteUrl } = globalSettings
    const pages = this.getDocuments('pages')
    const WithWrap = ({ children }) => (
      <Fragment>
        <Header />
        {children}
        <Footer globalSettings={globalSettings} />
      </Fragment>
    )
    return (
      <Router>
        <div className='React-Wrap'>
          {this.state.loading && <Spinner />}
          <ServiceWorkerNotifications reloadOnUpdate />

          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`${siteTitle} | %s`}
          />
          <Meta title={siteTitle} url={siteUrl} headerScripts={headerScripts} />

          <Switch>
            {pages.map((page, index) => {
              // check for blank ${page.slug}/
              let Template = Page
              if (page.template === 'Form') Template = FormTemplate
              return (
                <Route
                  key={index + page.slug}
                  render={props => (
                    <WithWrap>
                      <Template page={page} {...props} />
                    </WithWrap>
                  )}
                  // kabab this
                  path={`/${_kebabCase(page.slug.trim())}/`}
                  exact
                />
              )
            })}

            <Route
              render={props => (
                <WithWrap>
                  <ComingSoon {...props} />
                </WithWrap>
              )}
              path='/'
              exact
            />
            <Route
              render={props => (
                <WithWrap>
                  <Entries {...props} />
                </WithWrap>
              )}
              path='/admin/entries'
              exact
            />
            <Route
              render={() => (
                <WithWrap>
                  <NoMatch siteUrl={siteUrl} />
                </WithWrap>
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
