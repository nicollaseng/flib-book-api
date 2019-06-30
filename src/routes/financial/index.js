import express from 'express'
import User from '../../models/User'

import list from './list'
import close from './close'
import create from './create'
import update from './update'

const router = express.Router()

router.get('/', list)
router.get('/close',close)
router.post('/list', list)
router.post('/', create)
router.put('/', update)
router.get('/list', list)

export default router
