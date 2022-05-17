const { Router } = require('express')
const AuthRoute = require('./Routes/auth.routes')

const router = Router()

router.use('/api/auth', AuthRoute)

export default router
