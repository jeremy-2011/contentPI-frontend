// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation editField(
    $id: UUID!
    $fieldName: String!
    $identifier: String!
    $type: String!
    $description: String!
    $isHide: Boolean!
    $isMedia: Boolean!
    $isUnique: Boolean!
    $isRequired: Boolean!
    $isSystem: Boolean!
    $isPrimaryKey: Boolean!
  ) {
    editField(
      id: $id
      input: {
        fieldName: $fieldName
        identifier: $identifier
        type: $type
        description: $description
        isHide: $isHide
        isMedia: $isMedia
        isUnique: $isUnique
        isRequired: $isRequired
        isSystem: $isSystem
        isPrimaryKey: $isPrimaryKey
      }
    ) {
      id
      modelId
      fieldName
      identifier
      type
      defaultValue
      description
      isHide
      isMedia
      isUnique
      isRequired
      isSystem
      isPrimaryKey
    }
  }
`
