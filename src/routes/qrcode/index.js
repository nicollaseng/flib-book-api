import express from 'express'

import show from './show'

const router = express.Router()

router.get('/:text/:type', show)

export default router