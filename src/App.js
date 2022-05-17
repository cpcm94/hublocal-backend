const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { envConfig } = require('./Config/envConfig')
const { connectToDb } = require('./connectToDb')
const AuthRoute = require('./Routes/auth.routes')

const app = express()
const port = envConfig.port

app.use(cors())
app.use(bodyParser.json())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json());

// app.post('/book', (req, res) => {
//     // We will be coding here
// });

app.get('/', (req, res) => {
  res.send('estamos aqui')

  // connectToDb()
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }
})

app.use('/api/auth', AuthRoute)

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
)
