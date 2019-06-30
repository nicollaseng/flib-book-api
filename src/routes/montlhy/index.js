import express from 'express'

import list from './list'
import remove from './remove'
import create from './create'
import update from './update'

const router = express.Router()

router.get('/', list)
router.get('/remove',remove)
router.post('/list', list)
router.post('/', create)
router.put('/', update)

export default router
