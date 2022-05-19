const { Router } = require('express')

const controller = require('../Controllers/users.controller')
const { verifyToken } = require('../Middleware/verifyToken')
const router = Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get('/', verifyToken, controller.getUsers)

module.exports = router
