// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import Head from 'next/head'

// Shared components
import Content from '../Content'
import Sidebar from '../Sidebar'

// Styles
import styles from './MainLayout.scss'

// Interface
interface iProps {
  children: ReactElement
  header?: boolean
  sidebar?: boolean
  content?: boolean
  footer?: boolean
  title?: string
  noWrapper?: boolean
  router?: any
}

const Layout: FC<iProps> = ({
  children,
  header,
  sidebar,
  content,
  footer,
  title,
  noWrapper,
  router
}): ReactElement => {
  return (
    <>
      <Head>
        <title>Dashboard {title ? `- ${title}` : ''}</title>
        <meta name="title" content={`Dashboard ${title ? `- ${title}` : ''}`} />
      </Head>

      <div className={styles.layout}>
        {sidebar && <Sidebar router={router} />}
        {content && (
          <Content header={header} footer={footer} noWrapper={noWrapper} router={router}>
            {children}
          </Content>
        )}
        {!content && children}
      </div>
    </>
  )
}

export default memo(Layout)
