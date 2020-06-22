// Dependencies
import jwt from 'jsonwebtoken'
import { getBase64 } from 'fogg-utils'

// Configuration
import { $security } from '../../config'

const { secretKey } = $security

export function jwtVerify(accessToken: any, cb: any): void {
  jwt.verify(
    accessToken,
    secretKey,
    (error: any, accessTokenData: any = {}) => {
      const { data: empresa } = accessTokenData

      if (error || !empresa) {
        return cb(false)
      }

      const empresaData = getBase64(empresa)
      return cb(empresaData)
    }
  )
}

export async function getEmpresaData(accessToken: any): Promise<any> {
  const EmpresaPromise = new Promise(resolve =>
    jwtVerify(accessToken, (empresa: any) => resolve(empresa))
  )

  const empresa = await EmpresaPromise

  return empresa
}
