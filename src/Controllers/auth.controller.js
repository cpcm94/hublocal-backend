const db = require('../Models')
const { envConfig } = require('../Config/envConfig')
const User = db.user
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    hashedPassword: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.send({ message: 'User was registered successfully!' })
    })
    .catch((err) => {
      console.log('erro aqui', err)
      res.status(500).send({ message: err.message })
    })
}
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.hashedPassword
      )
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }
      const token = jwt.sign({ id: user.id }, envConfig.encodeToken, {
        expiresIn: 86400,
      })
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
