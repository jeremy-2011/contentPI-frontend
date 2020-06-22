// Interfaces
import { iProvincia, iCreateProvinciaInput, iModels } from '../../interfaces'
export default {
  Query: {
    getProvincia: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iProvincia[] =>
      models.Provincia.findAll({
        include: [
          {
            model: models.Canton,
            as: 'canton'
          }
        ]
      })
  },
  Mutation: {
    createProvincia: (
      _: any,
      { input }: { input: iCreateProvinciaInput },
      { models }: { models: iModels }
    ): iProvincia => models.Provincia.create({ ...input })
  }
}
