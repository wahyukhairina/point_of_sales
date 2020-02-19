const { port } = require('./src/config')
const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mainNavigation = require('./src/routes')
const cors = require('cors')

app.listen(port, () => console.log(`This server is running on port ${port}`))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors('*'))
app.use('/', mainNavigation)
