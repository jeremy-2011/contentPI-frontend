// Dependencies
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import withApollo from 'fogg-with-apollo'
import fetch from 'isomorphic-unfetch'

// Configuration
import config from '@config'

const link = createHttpLink({
  fetch,
  uri: config.api.uri,
  credentials: config.api.credentials
})

const client = withApollo(({ initialState }) => {
  return new ApolloClient({
    ssrMode: true,
    ssrForceFetchDelay: 100,
    cache: new InMemoryCache().restore(initialState || {}),
    link
  })
})

export default client
