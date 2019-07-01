import express from 'express'
import searchBook from './searchBook'
import bookVoting from './bookVoting'
import filterBooks from './filterBooks'

const router = express.Router()

router.get('/searchBook', searchBook)
router.post('/bookVoting', bookVoting)
router.post('/filterBooks', filterBooks)

export default router
