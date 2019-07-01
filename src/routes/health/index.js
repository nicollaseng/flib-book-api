const express = require('express')
const app = express()
// const router = express.Router()

console.log('daqui nao passa')

const health = () => app.get('/health', (req, res, next) => res.json(['oi']))

// app.get('/health', () => console.log('Oi'))

export default health
