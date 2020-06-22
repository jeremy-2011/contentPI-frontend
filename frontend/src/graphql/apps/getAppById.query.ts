// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getAppById($id: String!) {
    getAppById(id: $id) {
      id
      appName
      identifier
      icon
      models {
        id
        modelName
        identifier
      }
    }
  }
`
