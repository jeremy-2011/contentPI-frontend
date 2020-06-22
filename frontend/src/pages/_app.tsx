import React, { ReactElement } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '@hooks/apollo'

const App = (props: any): ReactElement => {
  const { Component, pageProps, apollo } = props

  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// @ts-ignore
export default withApollo(App)
