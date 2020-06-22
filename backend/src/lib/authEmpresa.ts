// Dependencies
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'

// Utils
import { encrypt, setBase64, isPasswordMatch } from 'fogg-utils'

// Interface
import { iEmpresa, iModels, iAuthPayloadE } from '../interfaces'

// Configuration
import { $security } from '../../config'

export const createToken = async (empresa: iEmpresa): Promise<string[]> => {
  const {
    empresa_id,
    empresa_usuario,
    empresa_password,
    empresa_email,
    privilege,
    empresa_active
  } = empresa
  const token = setBase64(`${encrypt($security.secretKey)}${empresa_password}`)
  const empresaData = {
    empresa_id,
    empresa_usuario,
    empresa_password,
    empresa_email,
    privilege,
    empresa_active,
    token
  }

  const createTk = jwt.sign(
    { data: setBase64(empresaData) },
    $security.secretKey,
    { expiresIn: $security.expiresIn }
  )

  return Promise.all([createTk])
}

export const getEmpresaBy = async (
  where: any,
  models: iModels
): Promise<iEmpresa> => {
  const empresa = await models.Empresa.findOne({
    where,
    raw: true
  })

  return empresa
}

export const doLogin = async (
  empresa_usuario: string,
  empresa_password: string,
  models: iModels
): Promise<iAuthPayloadE> => {
  console.log('empresa_usuario', empresa_usuario)
  console.log('empresa_password', empresa_password)
  const empresa = await getEmpresaBy({ empresa_usuario }, models)
  console.log('empresa', empresa)
  if (!empresa) {
    throw new AuthenticationError('Ingreso invalido')
  }
  const passwordMatch = isPasswordMatch(
    encrypt(empresa_password),
    empresa.empresa_password
  )
  const isActive = empresa.empresa_active
  if (!passwordMatch) {
    throw new AuthenticationError('Ingreso invalido')
  }
  if (!isActive) {
    throw new AuthenticationError('Tu cuenta aún no está activada')
  }
  const [token] = await createToken(empresa)
  return {
    token
  }
}
