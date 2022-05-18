module.exports = (sequelize, Sequelize) => {
  const Responsible = sequelize.define('Responsible', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  return Responsible
}
