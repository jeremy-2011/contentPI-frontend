// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getValuesByEntry($entry: UUID!) {
    getValuesByEntry(entry: $entry) {
      id
      entry
      value
      fieldId
    }
  }
`
