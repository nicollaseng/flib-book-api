import express from 'express'
import { searchBook } from './list'

const router = express.Router()

router.get('/', searchBook)

export default router
