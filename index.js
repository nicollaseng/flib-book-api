import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './src/index'
var emoji = require('node-emoji')

require('dotenv').config()

const app = express()

const PORT = process.env.APP_PORT || 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

routes(app)

app.listen(PORT, () => console.log(`Server started ${emoji.get('rocket')} at ${PORT}`))
