const db = require('../Models')

const User = db.user

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'Users Not found.' })
      }

      return res.status(200).send(users)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
