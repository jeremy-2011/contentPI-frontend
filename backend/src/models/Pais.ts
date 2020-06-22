// Dependencies
import { encrypt } from 'fogg-utils'

// Interface
import { iPais, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iPais => {
  const Pais = sequelize.define('Pais', {
    pais_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    pais_descripcion: {
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
  Pais.associate = (models: iModels): void => {
    Pais.hasMany(models.Provincia, {
      foreignKey: {
        name: 'paisId',
        field: 'pais_id'
      },
      as: 'provincia'
    })
  }

  return Pais
}
