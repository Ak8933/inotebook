const connectToMongo = require('./db')
const express = require('express')
connectToMongo();


const app = express()
const port = 5000

const cors = require('cors')

app.use(cors())

//middleware
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})