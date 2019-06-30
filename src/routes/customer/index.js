import express from 'express'
import create from './create'
import list from './list'
import show from './show'
import update from './update'
import remove from './remove'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
