// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation updateValues($entry: UUID!, $values: [CreateOrUpdateValueInput!]) {
    updateValues(entry: $entry, input: $values) {
      id
      entry
      value
    }
  }
`
