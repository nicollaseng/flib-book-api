import list from './list'
import create from './create'
import remove from './remove'
import adduser from './adduser'

import express from 'express'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.post('/adduser', adduser)
router.delete('/:id', remove)

export default router