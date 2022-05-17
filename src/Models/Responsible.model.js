module.exports = (sequelize, Sequelize) => {
  const Responsible = sequelize.define('Responsible', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contactnumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  return Responsible
}
