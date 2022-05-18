module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })
  return User
}
