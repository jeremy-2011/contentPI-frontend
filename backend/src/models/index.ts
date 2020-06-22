// Dependencies
import { Sequelize } from 'sequelize'

// Utils
import { hasKey } from 'fogg-utils'

// Configuration
import { $db } from '../../config'

// Interfaces
import { iModels } from '../interfaces'

// Db Connection
const { dialect = 'postgres', port, host, database, username, password } = $db
const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`
//inicializamos Sequelize
const sequelize = new Sequelize(uri)

// Models
const models: iModels = {
  App: sequelize.import('./App'),
  Declaration: sequelize.import('./Declaration'),
  Field: sequelize.import('./Field'),
  Value: sequelize.import('./Value'),
  Model: sequelize.import('./Model'),
  User: sequelize.import('./User'),
  Pais: sequelize.import('./Pais'),
  Provincia: sequelize.import('./Provincia'),
  Canton: sequelize.import('./Canton'),
  Empresa: sequelize.import('./Empresa'),
  sequelize
}

// Relationships
Object.keys(models).forEach((modelName: string) => {
  if (hasKey(models, modelName)) {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  }
})

export default models
