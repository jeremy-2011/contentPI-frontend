// Dependencies
import { encrypt } from 'fogg-utils'

// Interface
import { iProvincia, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iProvincia => {
  const Provincia = sequelize.define('Provincia', {
    provincia_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    provincia_descripcion: {
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
  Provincia.associate = (models: iModels): void => {
    Provincia.hasMany(models.Canton, {
      foreignKey: {
        name: 'provinciaId',
        field: 'provincia_id'
      },
      as: 'canton'
    })
  }
  return Provincia
}
