const { Sequelize } = require('sequelize')
const { envConfig } = require('./Config/envConfig')

const sequelize = new Sequelize(
  `postgres://${envConfig.postgresUser}:${envConfig.postgresPassword}@${envConfig.postgresHost}:${envConfig.postgresPort}/${envConfig.postgresDatabase}`,
  {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }
)
exports.connectToDb = () =>
  sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) =>
      console.error('Unable to connect to the database:', error)
    )

exports.sequelize = sequelize
