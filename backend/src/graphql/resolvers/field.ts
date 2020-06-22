// Interfaces
import { iField, iCreateFieldInput, iModels } from '../../interfaces'

export default {
  Query: {
    getFieldsByModelId: (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): iField[] => models.Field.findByPk(id)
  },
  Mutation: {
    createField: (
      _: any,
      { input }: { input: iCreateFieldInput },
      { models }: { models: iModels }
    ): iField => models.Field.create({ ...input }),
    deleteField: async (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const fieldToRemove = await models.Field.findByPk(id)

      if (fieldToRemove) {
        await fieldToRemove.destroy({ where: { id } })
        return fieldToRemove
      }

      return null
    },
    editField: async (
      _: any,
      { id, input }: { id: string; input: iCreateFieldInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const fieldToEdit = await models.Field.findByPk(id)

      if (fieldToEdit) {
        const updatedField = await fieldToEdit.update(
          { ...input },
          { where: { id } }
        )

        return updatedField
      }

      return null
    }
  }
}
