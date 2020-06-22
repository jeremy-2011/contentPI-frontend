// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getDeclarations {
    getDeclarations {
      id
      icon
      declaration
      description
      color
    }
  }
`
