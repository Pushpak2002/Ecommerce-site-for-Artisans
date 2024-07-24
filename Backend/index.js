const connectToMongo = require('./db');
const express = require('express')

connectToMongo();


const app = express()
const port = 3000


app.use(express.json()) //this is only to use app.body() to show request body data

//available routes
app.use('/api/auth', require('./routes/auth'))


app.get('/', (req, res) => {
  res.send('Hello Pushpak!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



