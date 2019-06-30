import express from 'express'

import checkin from './checkin'
import list from './list'
import checkout from './checkout'

const router = express.Router()

router.get('/', (req, res) => res.status(404).json({}))
router.get('/checkin', checkin)
router.get('/checkout', checkout)
router.get('/list', list)

export default router