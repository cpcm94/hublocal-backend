const { Router } = require('express')

const controller = require('../Controllers/tickets.controller')
const { verifyToken } = require('../Middleware/verifyToken')
const router = Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.post('/', verifyToken, controller.getTickets)
router.post('/createTicket', verifyToken, controller.createTicket)
router.post('/:ticketId', verifyToken, controller.getTicket)
router.delete('/:ticketId', verifyToken, controller.deleteTicket)
router.put('/:ticketId', verifyToken, controller.updateTicket)

module.exports = router
