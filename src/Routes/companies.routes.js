const { Router } = require('express')

const controller = require('../Controllers/companies.controller')
const { verifyToken } = require('../Middleware/verifyToken')
const router = Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get('/', verifyToken, controller.getCompanies)
router.post('/createCompany', verifyToken, controller.createCompany)
router.get('/:companyId', verifyToken, controller.getCompany)
router.delete('/:companyId', verifyToken, controller.deleteCompany)
router.put('/:companyId', verifyToken, controller.updateCompany)

module.exports = router
