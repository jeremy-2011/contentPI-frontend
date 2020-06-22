// Dependencies
import { Op } from 'sequelize'

// Interfaces
import {
  iValue,
  iCreateValueInput,
  iValueInput,
  iModels
} from '../../interfaces'

export default {
  Mutation: {
    createValues: async (
      _: any,
      { input }: { input: iCreateValueInput[] },
      { models }: { models: iModels }
    ): Promise<iValue[]> => {
      const insertedValues = await models.Value.bulkCreate(input)

      return insertedValues
    },
    findUniqueValues: async (
      _: any,
      { input }: { input: iValueInput[] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const data = await models.Value.findAll({
        where: {
          [Op.or]: input
        }
      })

      return data
    }
  }
}
