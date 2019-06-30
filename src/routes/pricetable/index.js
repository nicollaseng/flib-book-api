import list from './list'
import create from './create'
import update from './update'
import remove from './remove'
import show from './show'
import calculate from './calculate';

import express from 'express'
const router = express.Router()

router.get('/', list)
router.post('/list', list)
router.get('/calculate/:id/:check_id', calculate)
router.post('/', create)
router.put('/:id', update)
router.get('/:id', show)
router.delete('/:id', remove)

export default router