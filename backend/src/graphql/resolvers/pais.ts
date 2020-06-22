// Interfaces
import { iPais, iCreatePaisInput, iModels } from '../../interfaces'
export default {
  Query: {
    getPais: (_: any, _args: any, { models }: { models: iModels }): iPais[] =>
      models.Pais.findAll({
        include: [
          {
            model: models.Provincia,
            as: 'provincia'
          }
        ]
      })
  },
  Mutation: {
    createPais: (
      _: any,
      { input }: { input: iCreatePaisInput },
      { models }: { models: iModels }
    ): iPais => models.Pais.create({ ...input })
  }
}
