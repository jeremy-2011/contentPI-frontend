// Interfaces
import { iCanton, iCreateCantonInput, iModels } from '../../interfaces'
export default {
  Query: {
    getCanton: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iCanton[] =>
      models.Canton.findAll({
        include: [
          {
            model: models.Empresa,
            as: 'empresas'
          }
        ]
      })
  },
  Mutation: {
    createProvincia: (
      _: any,
      { input }: { input: iCreateCantonInput },
      { models }: { models: iModels }
    ): iCanton => models.Canton.create({ ...input })
  }
}
