const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { envConfig } = require('./envConfig')

const app = express()
const port = envConfig.port

app.use(cors())
app.use(bodyParser.json())

// Configuring body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/book', (req, res) => {
//     // We will be coding here
// });

app.get('/', (req, res) => {
  res.send('estamos aqui')
})

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
)
