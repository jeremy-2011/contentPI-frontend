// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge } from 'fogg-ui'

// Constants
import { SCHEMA_LINK } from '@constants/links'

// Components
import Link from '@ui/Link'

// Modals
import CreateModelModal from '@modals/CreateModelModal'

// Styles
import styles from './ModelSidebar.scss'

interface iProps {
  app: any
  router: any
}

const ModelSidebar: FC<iProps> = ({ app, router }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  // Models
  const { models = [] } = app

  return (
    <>
      <CreateModelModal
        label="Create new Model"
        isOpen={isOpen}
        onClose={handleModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <div className={styles.modelSidebar}>
        <div className={styles.wrapper}>
          <span className={styles.models}>Models</span>
          <span className={styles.create}>
            <Badge onClick={handleModal}>+ Create</Badge>
          </span>
        </div>

        <div className={styles.modelsWrapper}>
          {models.map((model: any) => {
            router.section = 'model'
            router.model = model.identifier

            return (
              <div key={model.id}>
                <Link href={SCHEMA_LINK(router).href} as={SCHEMA_LINK(router).as}>
                  {model.modelName}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default memo(ModelSidebar)
