// Dependencies
import { encrypt } from 'fogg-utils'

// Interface
import { iEmpresa, iModels, iDataTypes } from '../interfaces'
import models from 'models'

export default (sequelize: any, DataTypes: iDataTypes): iEmpresa => {
  const Empresa = sequelize.define(
    'Empresa',
    {
      empresa_id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      empresa_ruc: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: 'Solo se permite números'
          },
          len: {
            args: [13, 13],
            msg: 'El ruc de la empresa debeb terner 13 números'
          }
        }
      },
      empresa_nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      empresa_telefono: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: 'Solo se permite números'
          },
          len: {
            args: [6, 10],
            msg: 'El teléfono de la empresa debeb terner entre 6 10 números'
          }
        }
      },
      empresa_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      empresa_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The user just accepts alphanumeric characters'
          },
          len: {
            args: [4, 20],
            msg: 'The username must be from 4 to 20 characters'
          }
        }
      },
      empresa_password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [6, 20],
            msg:
              'El password de la empresa debeb terner entre 10 y 20 caracteres'
          }
        }
      },
      empresa_paginaweb: {
        type: DataTypes.STRING,
        allowNull: false
      },
      empresa_calleprincipal: {
        type: DataTypes.STRING,
        allowNull: true
      },
      empresa_callesecundaria: {
        type: DataTypes.STRING,
        allowNull: true
      },
      empresa_numero: {
        type: DataTypes.STRING,
        allowNull: true
      },
      empresa_referencia: {
        type: DataTypes.STRING,
        allowNull: true
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'empresa'
      },
      empresa_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeCreate: (empresa: iEmpresa): void => {
          empresa.empresa_password = encrypt(empresa.empresa_password)
        }
      }
    }
  )
  return Empresa
}
