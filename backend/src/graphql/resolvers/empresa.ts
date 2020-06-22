// Lib
import { getEmpresaData } from '../../lib/jwtempresa'

// Interfaces
import {
  iEmpresa,
  iCreateEmpresaInput,
  iModels,
  iLoginInputE,
  iAuthPayloadE
} from '../../interfaces'

// Utils
import { doLogin, getEmpresaBy } from '../../lib/authEmpresa'

export default {
  Query: {
    getUsers: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iEmpresa[] => models.Empresa.findAll(),

    getEmpresaData: async (
      _: any,
      { at }: { at: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      // Current connected user
      const connectedEmpresa = await getEmpresaData(at)

      if (connectedEmpresa) {
        // Validating if the user is still valid
        const empresa = await getEmpresaBy(
          {
            empresa_id: connectedEmpresa.empresa_id,
            empresa_usuario: connectedEmpresa.empresa_usuario,
            privilege: connectedEmpresa.privilege,
            empresa_active: connectedEmpresa.empresa_active
          },
          models
        )

        if (empresa) {
          return {
            ...connectedEmpresa
          }
        }
      }

      return {
        empresa_id: '',
        empresa_usuario: '',
        empresa_password: '',
        empresa_email: '',
        privilege: '',
        empresa_active: false,
        _DEBUG: JSON.stringify({
          hasCookie: Boolean(at)
        })
      }
    }
  },
  Mutation: {
    createEmpresa: (
      _: object,
      { input }: { input: iCreateEmpresaInput },
      { models }: { models: iModels }
    ): iEmpresa => models.Empresa.create({ ...input }),
    loginE: (
      _: any,
      { input }: { input: iLoginInputE },
      { models }: { models: iModels }
    ): Promise<iAuthPayloadE> =>
      doLogin(input.empresa_usuario, input.empresa_password, models)
  }
}
