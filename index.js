const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()

const apiRouter = require('./apiRouter')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

//using cors middleware to cross network request
app.use(cors())

//using router middleware
app.use('/api',apiRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`listenig on ${port}`))
