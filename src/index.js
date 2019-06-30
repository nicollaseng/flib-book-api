
import passport from "passport"
import auth from './auth/index'
import users from './routes/users/index'
import checkin from './routes/checkin/index'
import checkout from './routes/checkout/index'
import operation from './routes/operation/index'
import establishments from './routes/establishments/index'
import services from './routes/services/index'
import pricetable from './routes/pricetable/index'
import system from './routes/system/index'
import parameters from './routes/parameters/index'
import qrcode from './routes/qrcode/index'
import financial from './routes/financial/index'
import customer from './routes/customer/index'
import subscription from './routes/subscription/index'
import monthly from './routes/monthly/index'
import support from './routes/support/index'
import client from './routes/client/index'
import secretCode from './routes/secretCode/index'
import whatsapp from './routes/whatsapp/index'
import expense from './routes/expense/index'
import vehicleCategory from './routes/vehicleCategory/index'

export default (app) => {
  app.use('/checkin', passport.authenticate('jwt', {session: false}), checkin)
  app.use('/checkout', passport.authenticate('jwt', {session: false}), checkout)
  app.use('/operation', passport.authenticate('jwt', {session: false}), operation)
  app.use('/establishments', passport.authenticate('jwt', {session: false}), establishments)
  app.use('/services', passport.authenticate('jwt', {session: false}), services)
  app.use('/pricetable', passport.authenticate('jwt', {session: false}), pricetable)
  app.use('/parameters', passport.authenticate('jwt', {session: false}), parameters)
  app.use('/financial', passport.authenticate('jwt', {session: false}), financial)
  app.use('/customer', passport.authenticate('jwt', {session: false}), customer)
  app.use('/subscription', passport.authenticate('jwt', {session: false}), subscription)
  app.use('/monthly', passport.authenticate('jwt', {session: false}), monthly)
  app.use('/support', passport.authenticate('jwt', {session: false}), support)
  app.use('/client', passport.authenticate('jwt', {session: false}), client)
  app.use('/secretCode', passport.authenticate('jwt', {session: false}), secretCode)
  app.use('/whatsapp', passport.authenticate('jwt', {session: false}), whatsapp)
  app.use('/expense', passport.authenticate('jwt', {session: false}), expense)
  app.use('/vehicleCategory', passport.authenticate('jwt', {session: false}), vehicleCategory)

  app.use('/users', users)
  app.use('/auth', auth)
  app.use('/system', system)
  app.use('/qrcode', qrcode)
}
