import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import routes from './src/index'
import configPassport from './src/auth/passport'
require('dotenv').config()

const app = express()

const PORT = process.env.APP_PORT || 8000
const HOST = process.env.APP_HOST || '172.31.2.247'
const MONGO_HOST = process.env.MONGO_HOST || '172.31.2.247'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_DB = process.env.MONGO_DB || 'acospark'

// Autenticando rotas
configPassport(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use('/images', express.static(__dirname + '/Images'));

routes(app)

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,  { useNewUrlParser: true })

app.listen(PORT, HOST, () => console.log(`Express has been started ${HOST}:${PORT}`))
