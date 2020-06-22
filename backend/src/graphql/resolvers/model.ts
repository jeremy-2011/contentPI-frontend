// Interfaces
import {
  iModel,
  iCreateModelInput,
  iEditModelInput,
  iModels
} from '../../interfaces'

export default {
  Query: {
    getModels: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iModel[] =>
      models.Model.findAll({
        include: [
          {
            model: models.Field,
            as: 'fields'
          }
        ]
      }),
    getModel: async (
      _: any,
      { identifier, appId }: { identifier: string; appId: string },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const data = await models.Model.findAll({
        where: {
          identifier,
          appId
        },
        include: [
          {
            model: models.Field,
            as: 'fields',
            include: [
              {
                model: models.Value,
                as: 'values'
              }
            ]
          }
        ]
      })

      // Sorting by creation date
      data[0].fields.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? 1 : -1
      )

      return data[0]
    }
  },
  Mutation: {
    createModel: async (
      _: any,
      { input }: { input: iCreateModelInput },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const newModel = await models.Model.create({ ...input })

      const systemFields = [
        {
          modelId: newModel.id,
          fieldName: 'Status',
          identifier: 'status',
          type: 'Status',
          isHide: false,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The status of the record',
          defaultValue: 'draft'
        },
        {
          modelId: newModel.id,
          fieldName: 'ID',
          identifier: 'id',
          type: 'ID',
          isHide: false,
          isMedia: false,
          isUnique: true,
          isRequired: true,
          isPrimaryKey: true,
          isSystem: true,
          description: 'The unique identifier'
        },
        {
          modelId: newModel.id,
          fieldName: 'Created At',
          identifier: 'createdAt',
          type: 'DateTime',
          isHide: true,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The time the record was created'
        },
        {
          modelId: newModel.id,
          fieldName: 'Updated At',
          identifier: 'updatedAt',
          type: 'DateTime',
          isHide: true,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The time the record was updated'
        }
      ]

      // Creating system fields
      await models.Field.bulkCreate(systemFields)

      return newModel
    },
    deleteModel: async (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const modelToRemove = await models.Model.findByPk(id)

      if (modelToRemove) {
        await modelToRemove.destroy({ where: { id } })
        return modelToRemove
      }

      return null
    },
    editModel: async (
      _: any,
      { id, input }: { id: string; input: iEditModelInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const modelToEdit = await models.Model.findByPk(id)

      if (modelToEdit) {
        const updatedModel = await modelToEdit.update(
          { ...input },
          { where: { id } }
        )

        return updatedModel
      }

      return null
    }
  }
}
