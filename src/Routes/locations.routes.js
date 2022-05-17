const { Router } = require('express')

const controller = require('../Controllers/locations.controller')
const { verifyToken } = require('../Middleware/verifyToken')
const router = Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.post('/', verifyToken, controller.getLocations)
router.post('/createLocation', verifyToken, controller.createLocation)
router.post('/:locationId', verifyToken, controller.getLocation)
router.delete('/:locationId', verifyToken, controller.deleteLocation)
router.put('/:locationId', verifyToken, controller.updateLocation)

module.exports = router
