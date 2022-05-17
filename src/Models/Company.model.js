module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('Company', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CNPJ: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        len: [14],
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    main_responsible: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })
  return Company
}
