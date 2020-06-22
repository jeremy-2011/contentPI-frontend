// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation deleteModel($id: UUID!) {
    deleteModel(id: $id) {
      id
      modelName
      appId
    }
  }
`
