// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getApps {
    getApps {
      id
      appName
      identifier
      description
      icon
    }
  }
`
