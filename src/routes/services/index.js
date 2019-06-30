import express from 'express'

import list from './list'
import create from './create'
import remove from './remove'
import update from './update'
import show from './show'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.get('/:id', show)
router.delete('/:id', remove)
router.put('/:id', update)

export default router