const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();

connectToMongo();

//middleware
app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port || process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${port || process.env.PORT}`)
})