// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getModel($identifier: String!, $appId: UUID!) {
    getModel(identifier: $identifier, appId: $appId) {
      id
      appId
      modelName
      identifier
      description
      fields {
        id
        type
        fieldName
        defaultValue
        identifier
        description
        isHide
        isMedia
        isRequired
        isUnique
        isSystem
        isPrimaryKey
        values {
          id
          entry
          value
        }
      }
    }
  }
`
