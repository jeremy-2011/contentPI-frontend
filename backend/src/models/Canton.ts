// Dependencies
import { encrypt } from 'fogg-utils'

// Interface
import { iCanton, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iCanton => {
  const Canton = sequelize.define('Canton', {
    canton_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    canton_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

  Canton.associate = (models: iModels): void => {
    Canton.hasMany(models.Empresa, {
      foreignKey: {
        name: 'cantonId',
        field: 'canton_id'
      },
      as: 'empresas'
    })
  }
  return Canton
}
