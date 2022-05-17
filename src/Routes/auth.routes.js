const { Router } = require('express')
const {
  checkDuplicateUsernameOrEmail,
} = require('../Middleware/checkDuplicateUsernameOrEmail')
const controller = require('../Controllers/auth.controller')
const router = Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})
router.post('/signup', checkDuplicateUsernameOrEmail, controller.signup)
router.post('/signin', controller.signin)

module.exports = router
