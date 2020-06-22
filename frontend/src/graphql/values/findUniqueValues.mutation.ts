// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation findUniqueValues($input: [ValueInput]) {
    findUniqueValues(input: $input) {
      id
      entry
      value
    }
  }
`
