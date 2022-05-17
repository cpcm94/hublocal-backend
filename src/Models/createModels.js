const { connectToDb, sequelize } = require('../connectToDb')
const { DataTypes } = require('sequelize')

connectToDb()
  .then(() => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING(64),
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
      },
    })

    const Company = sequelize.define('Company', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CNPJ: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      main_responsible: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })

    const Location = sequelize.define('Location', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_responsible: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })

    const Responsible = sequelize.define('Responsible', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactnumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })

    const Ticket = sequelize.define('Ticket', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    })

    User.hasMany(Company)
    Company.belongsTo(User)

    Company.hasMany(Responsible)
    Responsible.belongsTo(Company)

    Company.hasMany(Location)
    Location.belongsTo(Company)

    Location.hasMany(Responsible)
    Responsible.belongsTo(Location)

    Location.hasMany(Ticket)
    Ticket.belongsTo(Location)

    const closeConnection = () =>
      sequelize
        .close()
        .then(() => console.log('Connection closed Successfully'))
        .catch((error) =>
          console.log(`Error when closing connection: ${error}`)
        )

    sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Syncronization successful')
      })
      .catch((error) => console.log(`Error when trying to sync:${error}`))
      .finally(() => closeConnection())
  })
  .catch((error) => console.log(`Error on auth: ${error}`))
