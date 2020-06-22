// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation deleteField($id: UUID!) {
    deleteField(id: $id) {
      id
      fieldName
    }
  }
`
