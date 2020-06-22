// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation createField(
    $modelId: UUID!
    $fieldName: String!
    $identifier: String!
    $type: String!
    $defaultValue: String!
    $description: String!
    $isHide: Boolean!
    $isMedia: Boolean!
    $isUnique: Boolean!
    $isRequired: Boolean!
    $isSystem: Boolean!
    $isPrimaryKey: Boolean!
  ) {
    createField(
      input: {
        modelId: $modelId
        fieldName: $fieldName
        identifier: $identifier
        type: $type
        defaultValue: $defaultValue
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
