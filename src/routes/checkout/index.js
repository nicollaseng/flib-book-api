import list from './list'
import create from './create'
// import update from './update'
import remove from './remove'
import show from './show'

import express from 'express'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.get('/:id', show)
//router.put('/:id', update)
router.delete('/:id', remove)

export default router