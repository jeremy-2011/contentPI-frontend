import {
  App,
  Declaration,
  Value,
  Field,
  Model,
  User,
  Empresa,
  Pais,
  Provincia,
  Canton,
  Sequelize
} from './types'

// Sequelize
export interface iDataTypes {
  UUID: string
  UUIDV4(): string
  STRING: string
  BOOLEAN: boolean
  TEXT: string
  INTEGER: number
  DATE: string
  FLOAT: number
}

// App
export interface iApp extends App, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateAppInput extends App {}

// Declaration
export interface iDeclaration extends Declaration, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateDeclarationInput extends Declaration {}

// Value
export interface iValue extends Value, Sequelize {
  id: string
}

export interface iCreateValueInput extends Value {}

export interface iValueInput {
  value: string
}

// Field
export interface iField extends Field, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateFieldInput extends Field {}

// Model
export interface iModel extends Model, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}
export interface iCreateModelInput extends Model {}
export interface iEditModelInput extends Model {}
// User
export interface iUser extends User, Sequelize {
  id: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface iCreateUserInput extends User {}
//Empresa instaciamos la interface y agreamos los campos
export interface iEmpresa extends Empresa, Sequelize {
  empresa_id: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface iCreateEmpresaInput extends Empresa {}
//pais instaciamos la interface y agreamos los campos
export interface iPais extends Pais, Sequelize {
  pais_id: string
  createdAt?: Date
  updatedAt?: Date
}
export interface iCreatePaisInput extends Pais {}
//provincia instaciamos la interface y agreamos los campos
export interface iProvincia extends Provincia, Sequelize {
  provincia_id: string
  createdAt?: Date
  updatedAt?: Date
}
//extendemos la funcion iCreateProvinciaInput y exyendemos a provincia para obteer los campos requeridos
export interface iCreateProvinciaInput extends Provincia {}
//Canton instaciamos la interface y agreamos los campos
export interface iCanton extends Canton, Sequelize {
  canton_id: string
  createdAt?: Date
  updatedAt?: Date
}
export interface iCreateCantonInput extends Canton {}

export interface iLoginInput {
  email: string
  password: string
}
export interface iLoginInputE {
  empresa_usuario: string
  empresa_password: string
}

export interface iAuthPayload {
  token: string
}
export interface iAuthPayloadE {
  token: string
}

// Models
export interface iModels {
  App: any
  Declaration: any
  Field: any
  Value: any
  Model: any
  User: any
  Empresa: any
  Pais: any
  Provincia: any
  Canton: any
  sequelize: any
}
