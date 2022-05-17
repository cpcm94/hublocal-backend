const { Sequelize } = require('sequelize')
const { envConfig } = require('./envConfig')

const sequelize = new Sequelize(
  `postgres://${envConfig.postgresUser}:${envConfig.postgresPassword}@${envConfig.postgresHost}:${envConfig.postgresPort}/${envConfig.postgresDatabase}`,
  {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./User.model')(sequelize, Sequelize)
db.company = require('./Company.model')(sequelize, Sequelize)
db.location = require('./Location.model')(sequelize, Sequelize)
db.responsible = require('./Responsible.model')(sequelize, Sequelize)
db.ticket = require('./Ticket.model')(sequelize, Sequelize)

db.user.hasMany(db.company)
db.company.belongsTo(db.user)

db.company.hasMany(db.responsible)
db.responsible.belongsTo(db.company)

db.company.hasMany(db.location)
db.location.belongsTo(db.company)

db.location.hasMany(db.responsible)
db.responsible.belongsTo(db.location)

db.location.hasMany(db.ticket)
db.ticket.belongsTo(db.location)

module.exports = db
