import User from './../models/User'
import jwt from 'jwt-simple'
import JwtConfig from './config'
import Params from './../services/Parameters'

export default async  (req, res) => {

  let { document, password } = req.body

  try {

    let user = await User.findOne({document})

    let userRes = await User.findById(user._id)
                  .populate('establishment')
                  .select('-password')                    

    if(!user) {
      return res.status(404)
          .json({token: '', user: ''})
    }

    user.validatePassword(password, async (err, result) => {
      if(!result || err){
        return res.status(404)
            .json({token: '', user: ''})
      }

      let token = jwt.encode({id: user._id}, JwtConfig.secretOrKey)
      let parameters = Params(user.establishment)
      parameters = await parameters.list()

      return res.json({ token, user: userRes, parameters: parameters })
    })
  } catch (err) {
    return res.status(203).json({ err })
  }
}