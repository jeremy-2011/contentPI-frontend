// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getUserData($at: String!) {
    getUserData(at: $at) {
      id
      email
      username
      privilege
      active
      _DEBUG
    }
  }
`
