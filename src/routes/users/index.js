import express from 'express'
import create from './create'
import list from './list'
import show from './show'
import update from './update'
import passport from 'passport';

const router = express.Router()

router.post('/', create)
router.get('/', passport.authenticate('jwt', {session: false}), list)
router.get('/:id', passport.authenticate('jwt', {session: false}), show)
router.put('/:id', passport.authenticate('jwt', {session: false}), update)
router.patch('/:id', passport.authenticate('jwt', {session: false}), update)

export default router