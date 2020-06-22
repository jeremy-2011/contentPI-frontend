// Dependencies

/*import dotenv from 'dotenv'*/
// Configuration
import config from './config.json'

// Loading .env vars
/*dotenv.config()*/

// Definicion de Interfaces
// Intarface de la conexiona a la bd
interface iDb {
  dialect: string
  host: string
  port: number
  database: string
  username: string
  password: string
}
// Intarface del security
interface iSecurity {
  secretKey: string
  expiresIn: string
}
// Intarface del server
interface iServer {
  port: number
}

// Extracting data from .env file
/*
const {
  DB_DIALECT = '',
  DB_PORT = '',
  DB_HOST = '',
  DB_DATABASE = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
  SECURITY_SECRET_KEY = ''
} = process.env

const db: iDb = {
  dialect: DB_DIALECT,
  port: DB_PORT,
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD
}
*/
// Configuration
//const { security, server } = config
const { db, security, server } = config

// Getting Secret Key from .env file
/*security.secretKey = SECURITY_SECRET_KEY*/

//asigno datos ala variables de configuracion
export const $db: iDb = db
export const $security: iSecurity = security
export const $server: iServer = server
