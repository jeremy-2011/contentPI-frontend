export type App = {
  appName: string
  identifier: string
  icon: string
  description: string
}

export type Declaration = {
  declaration: string
  icon: string
  description: string
}

export type Field = {
  type: string
  fieldName: string
  identifier: string
  description: string
  isRequired: boolean
  isUnique: boolean
  isHide: boolean
}

export type Value = {
  entry: number
  value: string
}

export type Model = {
  modelName: string
  identifier: string
  description: string
}

export type User = {
  username: string
  password: string
  email: string
  privilege: string
  active: boolean
}

export type Pais = {
  pais_descripcion: string
  pais_active: boolean
}
export type Provincia = {
  provincia_descripcion: string
  provincia_active: boolean
}
export type Canton = {
  canton_descripcion: string
  canton_active: boolean
}
export type Empresa = {
  empresa_ruc: string
  empresa_nombre: string
  empresa_telefono: string
  empresa_email: string
  empresa_usuario: string
  empresa_password: string
  empresa_paginaweb: string
  empresa_calleprincipal: string
  empresa_callesecundaria: string
  empresa_numero: string
  empresa_referencia: string
  privilege: string
  empresa_active: boolean
}
export type Sequelize = {
  _defaults?: any
  name?: string
  options?: any
  associate?: any
}
