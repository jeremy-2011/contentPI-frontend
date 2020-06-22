// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { slugFn, getEmptyValues, waitFor } from 'fogg-utils'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import GET_VALUES_BY_ENTRY_QUERY from '@graphql/values/getValuesByEntry.query'
import UPDATE_VALUES_MUTATION from '@graphql/values/updateValues.mutation'

// Components
import CustomFields from '../CustomFields'
import SystemFields from '../SystemFields'

interface iProps {
  router: any
  data: any
}

const Edit: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getModel, entryId } = data

  // Executing Queries
  const { data: dataValues } = useQuery(GET_VALUES_BY_ENTRY_QUERY, {
    variables: {
      entry: entryId
    }
  })

  // Blocking render when dataValues is not ready
  if (!dataValues) {
    return <div />
  }

  // Fields
  const initialValues: any = {}
  const systemInitialValues: any = {}
  const requiredValues: any = {}
  const systemFields = getModel.fields.filter((field: any) => field.isSystem)
  const customFields = getModel.fields.filter((field: any) => !field.isSystem)

  // Custom fields
  customFields.forEach((field: any) => {
    const val = dataValues.getValuesByEntry.find(
      (valueEntry: any) => valueEntry.fieldId === field.id
    )

    initialValues[field.identifier] = val.value

    if (field.isRequired) {
      requiredValues[field.identifier] = false
    }
  })

  // System fields
  systemFields.forEach((field: any) => {
    let value = field.defaultValue

    const val = dataValues.getValuesByEntry.find(
      (valueEntry: any) => valueEntry.fieldId === field.id
    )

    if (field.identifier === 'createdAt') {
      value = moment().format('MM/DD/YYYY hh:mm a')
    }

    if (field.identifier === 'updatedAt') {
      value = ''
    }

    systemInitialValues[field.identifier] = val.value || value
  })

  // Mutations
  const [updateValuesMutation] = useMutation(UPDATE_VALUES_MUTATION)

  // States
  const [active, setActive] = useState('')
  const [alert, setAlert] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [showAlert, setShowAlert] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [systemValues, setSystemValues] = useState(systemInitialValues)
  const [required, setRequired] = useState(requiredValues)
  const [saveLoading, setSaveLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const handleAfterCreateOrEditEntryModal = (): void => setIsOpen(!isOpen)

  const handleActive = (field: string) => {
    setActive(field)
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'title') {
      if (Object.prototype.hasOwnProperty.call(initialValues, 'slug')) {
        setValue('slug', slugFn(e.target.value), setValues)
      }

      if (Object.prototype.hasOwnProperty.call(initialValues, 'identifier')) {
        setValue('identifier', slugFn(e.target.value), setValues)
      }
    }

    onChange(e, setValues)
  }

  const handleSubmit = async (action: string): Promise<void> => {
    const emptyValues = getEmptyValues(values, Object.keys(requiredValues))
    const entryValues: any[] = []

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      if (action === 'save') {
        setSaveLoading(true)
      } else {
        setPublishLoading(true)
      }

      waitFor(2).then(async () => {
        if (action === 'save') {
          setSaveLoading(false)
        } else {
          setPublishLoading(false)
        }

        // Setting up System Field values
        values.id = systemValues.id
        values.status = action === 'save' ? 'Draft' : 'Published'
        values.createdAt = systemValues.createdAt
        values.updatedAt = moment().format()

        Object.keys(values).forEach((fieldIdentifier: string) => {
          const valueField = getModel.fields.find(
            (field: any) => field.identifier === fieldIdentifier
          )

          entryValues.push({
            entry: entryId,
            fieldId: valueField.id,
            value: values[fieldIdentifier]
          })
        })

        const { data: dataUpdateValues } = await updateValuesMutation({
          variables: {
            entry: entryId,
            values: entryValues
          }
        })

        if (dataUpdateValues) {
          setAlert(action === 'save' ? 'Saved' : 'Published')
          setShowAlert(true)
          setAlertType('success')
          setSystemValues({
            id: values.id,
            createdAt: values.createdAt,
            updatedAt: values.updatedAt,
            status: values.status
          })

          waitFor(1).then(() => {
            setShowAlert(false)
            handleAfterCreateOrEditEntryModal()
          })
        }
      })
    }
  }

  return (
    <MainLayout
      title={`Edit ${values.title ? values.title : 'Entry'}`}
      header
      content
      footer
      sidebar
      noWrapper
      router={router}
    >
      <>
        <CustomFields
          active={active}
          handleActive={handleActive}
          getModel={getModel}
          router={router}
          values={values}
          customFields={customFields}
          required={required}
          onChange={_onChange}
        />

        <SystemFields
          isOpen={isOpen}
          alert={alert}
          alertType={alertType}
          handleSubmit={handleSubmit}
          publishLoading={publishLoading}
          router={router}
          saveLoading={saveLoading}
          showAlert={showAlert}
          systemFields={systemFields}
          systemValues={systemValues}
        />
      </>
    </MainLayout>
  )
}

export default memo(Edit)
