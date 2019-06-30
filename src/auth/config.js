import { ExtractJwt } from 'passport-jwt'

export default {
  secretOrKey: '@#*877lrGbTuys8777l@#*8778*asJsNs',
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
}