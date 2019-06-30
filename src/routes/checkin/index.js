import list from './list'
import create from './create'
import update from './update'
import remove from './remove'
import show from './show'
import plate from './plate'
import plateForPriceTable from './plateForPriceTable'
import existsForPlate from './existsForPlate'

import express from 'express'

const router = express.Router()

router.get('/', list)
router.get('/exists/:plate', existsForPlate)
router.post('/', create)
router.get('/:id', show)
router.get('/:plate/plate', plate)
router.get('/:plate/plate/:pricetable', plateForPriceTable)
router.put('/:id', update)
router.delete('/:id', remove)

export default router