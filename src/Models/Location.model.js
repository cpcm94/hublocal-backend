module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define('Location', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    main_responsible: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })
  return Location
}
