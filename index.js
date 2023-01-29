const express = require('express');
const app = express()
const cors = require('cors')
const apiRouter = require('./apiRouter')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

//using cors middleware to cross network request
app.use(cors())

//using router middleware
app.use('/api',apiRouter);

app.listen(3001,()=> console.log('listenig on 3001'))
