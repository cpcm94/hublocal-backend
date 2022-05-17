module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    creator: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    responder: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updated_info: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  })

  return Ticket
}
