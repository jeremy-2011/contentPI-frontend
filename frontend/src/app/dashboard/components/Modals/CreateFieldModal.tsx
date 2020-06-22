// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton, Toggle } from 'fogg-ui'
import { camelCase, getEmptyValues, redirectTo, getParamsFromUrl, waitFor } from 'fogg-utils'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

// Hooks
import usePrevious from '@hooks/usePrevious'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import CREATE_FIELD_MUTATION from '@graphql/fields/createField.mutation'
import GET_MODEL_QUERY from '@graphql/models/getModel.query'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateFieldModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  const { appId } = getParamsFromUrl(['page', 'appId', 'stage'])

  // States
  const initialValues = {
    model: options.data.modelIdentifier,
    modelId: '',
    fieldName: '',
    identifier: '',
    type: options.data.type,
    defaultValue: '',
    description: '',
    isHide: false,
    isMedia: false,
    isUnique: false,
    isRequired: true,
    isSystem: false,
    isPrimaryKey: false
  }
  const [values, setValues] = useState(initialValues)
  const [required, setRequired] = useState<any>({
    fieldName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Mutations
  const [createFieldMutation] = useMutation(CREATE_FIELD_MUTATION)

  // Queries
  const [getModelQueryThenCreateField] = useLazyQuery(GET_MODEL_QUERY, {
    onCompleted: async data => createField(data)
  })

  // Previous Props
  const prevProps: any = usePrevious({ options })

  // Methods
  const _onChange = (e: any): any => {
    if (e.target.name === 'fieldName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  const createField = async (data: any): Promise<void> => {
    if (data.getModel && data.getModel.id) {
      values.modelId = data.getModel.id

      const { data: dataField } = await createFieldMutation({
        variables: values
      })

      if (dataField.createField) {
        _onClose()
        redirectTo('_self')
      }
    }
  }

  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['fieldName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(1).then(async () => {
        setLoading(false)

        // Creating a new field
        getModelQueryThenCreateField({
          variables: {
            identifier: values.model,
            appId
          }
        })
      })
    }
  }

  // Effects
  useEffect(() => {
    if (prevProps && prevProps.options !== options) {
      setValue('type', options.data.type, setValues)
    }
  }, [prevProps, options])

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={_onClose}>
      <div className={styles.modal}>
        <div>
          <label htmlFor="fieldName">
            Field Name {required.fieldName && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="fieldName"
            name="fieldName"
            placeholder="First Field? Try Title"
            hasError={required.fieldName}
            onChange={_onChange}
            value={values.fieldName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            Identifier {required.identifier && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="identifier"
            name="identifier"
            value={values.identifier}
            hasError={required.identifier}
            onChange={_onChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Input
            name="description"
            placeholder="Small description about your new app"
            onChange={_onChange}
            value={values.description}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Make field required"
            onChange={(): void => setValue('isRequired', !values.isRequired, setValues)}
            checked={values.isRequired}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as Primary Key"
            onChange={(): void => setValue('isPrimaryKey', !values.isPrimaryKey, setValues)}
            checked={values.isPrimaryKey}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as unique"
            onChange={(): void => setValue('isUnique', !values.isUnique, setValues)}
            checked={values.isUnique}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Hide field"
            onChange={(): void => setValue('isHide', !values.isHide, setValues)}
            checked={values.isHide}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Is Media (image, video or document)?"
            onChange={(): void => setValue('isMedia', !values.isMedia, setValues)}
            checked={values.isMedia}
          />
        </div>

        <div className={styles.buttons}>
          <LinkButton onClick={_onClose}>Cancel</LinkButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Creating Field...">
            Create Field
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(CreateFieldModal)
