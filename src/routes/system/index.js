import express from 'express'

import information from './information'

const router = express.Router()

router.get('/information', information)

export default router