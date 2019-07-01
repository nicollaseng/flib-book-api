import express from 'express'
import searchBook from './searchBook'

const router = express.Router()

console.log('daqui nao passa')

router.get('/searchBook', searchBook)

export default router
