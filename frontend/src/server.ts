// Dependencies
import express from 'express'
import next from 'next'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//import session from 'express-session'
import session from 'cookie-session'
import { buildUrl } from 'fogg-utils'

// Middleware
import { isConnected } from './shared/lib/middlewares/user'

// Config
import config from './config'

// Settings up Next App
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// Running Next App
nextApp.prepare().then(() => {
  const app = express()

  // Public static
  app.use(express.static(path.join(__dirname, '../public')))

  // Middlewares

  // Middlewares

  app.use(
    session({
      secret: 'Gr4pQLCM5', //config.security.secretKey,
      maxAge: 24 * 60 * 60 * 1000 * Number(config.security.expiresIn[0])
    })
  )

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser(config.security.secretKey))
  app.use(cors({ credentials: true, origin: true }))

  // Routes
  app.get('/login', isConnected(false), (req: any, res: any) => {
    return nextApp.render(req, res, '/users/login')
  })

  app.get('/logout', (req, res) => {
    const redirect: any = req.query.redirectTo || '/'
    res.clearCookie('at')
    res.redirect(redirect)
  })

  app.use(
    '/dashboard/:appId/:stage?/playground',
    isConnected(true, ['god', 'admin'], '/login?redirectTo=/dashboard'),
    (req: any, res: any) => {
      return nextApp.render(req, res, '/dashboard/playground')
    }
  )

  app.use(
    `/dashboard/:appId?/:stage?/:moduleName?/:section?/:model?/:entryId?`,
    isConnected(true, ['god', 'admin', 'editor'], '/login?redirectTo=/dashboard'),
    (req: any, res: any) => {
      const { appId, stage, moduleName, section, model, entryId } = req.params

      const url = buildUrl(['dashboard', appId, stage, moduleName, section, model])

      if (entryId) {
        req.query.entryId = entryId
      }

      return nextApp.render(req, res, `/${url}`, req.query)
    }
  )

  app.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  // Listening port 3000
  app.listen(config.server.port)
})
