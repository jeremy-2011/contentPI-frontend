// Dependencies
import React, { FC, ReactElement, createElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import Schema from '@dashboard/components/Schema'
import Content from '@dashboard/components/Content'
import Create from '@dashboard/components/Content/Create'
import Edit from '@dashboard/components/Content/Edit'
import PageNotFound from '@dashboard/components/Error/PageNotFound'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'

const Page: FC = (): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, moduleName, model, entryId = '' } = router.query

  // Executing Queries
  const { data: dataModel, loading: loadingModel } = useQuery(GET_MODEL_QUERY, {
    variables: {
      identifier: model,
      appId
    }
  })
  const { data: dataDeclarations, loading: loadingDeclarations } = useQuery(GET_DECLARATIONS_QUERY)

  // Loading...
  if (loadingModel || loadingDeclarations) {
    return <div />
  }

  // First render?
  if (!dataModel && !dataDeclarations) {
    return <div />
  }

  // Pages components
  const Pages: any = {
    schema: Schema,
    content: Content,
    create: Create,
    edit: Edit
  }

  const renderPage = (page: any) => {
    if (Pages[page] && dataModel && dataDeclarations) {
      return createElement(Pages[page], {
        router: router.query,
        data: {
          entryId,
          ...dataModel,
          ...dataDeclarations
        }
      })
    }

    return <PageNotFound />
  }

  return (
    <UserProvider>
      <AppProvider id={appId}>
        <FormProvider>{renderPage(moduleName)}</FormProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default Page
