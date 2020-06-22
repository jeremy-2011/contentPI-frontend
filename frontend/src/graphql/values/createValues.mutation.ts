// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation createValues($values: [CreateOrUpdateValueInput!]) {
    createValues(input: $values) {
      id
      entry
      value
    }
  }
`
