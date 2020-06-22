// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Icon } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Sidebars
import ModelSidebar from '@dashboard/components/Models/ModelSidebar'
import ContentSidebar from '@dashboard/components/Content/ContentSidebar'

// Components
import Link from '@ui/Link'
import AppIcon from '@dashboard/components/MyApps/AppIcon'
import Logo from '../Logo'

// Styles
import styles from './Sidebar.scss'

// Interface
interface iProps {
  router: any
}

const Sidebar: FC<iProps> = ({ router }): ReactElement => {
  // State
  const [open, setOpen] = useState(false)
  const [sidebar, setSidebar] = useState('')

  // Contexts
  const {
    state: { getAppById }
  } = useContext(AppContext)

  // Methods
  const handleOpen = (side: string, isOpen: boolean): void => {
    setSidebar(side)
    setOpen(isOpen)
  }

  return (
    <aside className={styles.sidebar}>
      <section className={styles.firstOptions}>
        <div className={styles.isoType}>
          <Logo />
        </div>

        <ul>
          {getAppById && (
            <li className={styles.appIcon}>
              <AppIcon app={getAppById} hideName />
            </li>
          )}

          <li onClick={(): void => handleOpen('model', true)}>
            <Link href="#" title="Models">
              <Icon type="fas fa-cubes" />
            </Link>
          </li>

          <li onClick={(): void => handleOpen('content', true)}>
            <Link href="#" title="Content">
              <Icon type="fas fa-pencil-alt" />
            </Link>
          </li>

          <li>
            <Link href="#" title="Media">
              <Icon type="fas fa-photo-video" />
            </Link>
          </li>

          <li>
            <Link href="/logout?redirectTo=/dashboard" title="Logout">
              <Icon type="fas fa-power-off" />
            </Link>
          </li>
        </ul>

        <section className={styles.profile}>
          <span title="Carlos Santana">CS</span>
        </section>
      </section>

      <section className={`${styles.closed} ${open ? `${styles.secondOptions}` : ''}`}>
        <div className={styles.close} onClick={(): void => handleOpen('', false)}>
          <span>
            <Icon type="fas fa-arrow-left" />
          </span>
        </div>

        <div className={styles.subOptions}>
          {sidebar === 'model' && <ModelSidebar app={getAppById} router={router} />}
          {sidebar === 'content' && <ContentSidebar app={getAppById} router={router} />}
        </div>
      </section>
    </aside>
  )
}

export default memo(Sidebar)
