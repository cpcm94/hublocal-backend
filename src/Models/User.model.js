module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      type: Sequelize.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
  })
  return User
}
