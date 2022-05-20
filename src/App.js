const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { envConfig } = require('./Config/envConfig')
const AuthRoute = require('./Routes/auth.routes')
const CompaniesRoute = require('./Routes/companies.routes')
const LocationsRoute = require('./Routes/locations.routes')
const TicketsRoute = require('./Routes/tickets.routes')
const UsersRoute = require('./Routes/users.route')

const app = express()
const port = envConfig.port

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API Hublocal test')
})

app.use('/api/auth', AuthRoute)
app.use('/api/users', UsersRoute)
app.use('/api/companies', CompaniesRoute)
app.use('/api/locations', LocationsRoute)
app.use('/api/tickets', TicketsRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))
