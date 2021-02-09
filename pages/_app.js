import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import MainLayout from '../components/MainLayout'

export default function MyApp(props) {
  const { Component, pageProps, router } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <AnimatePresence exitBeforeEnter> */}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        {/* key={router.route} */}
        {/* </AnimatePresence> */}
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
