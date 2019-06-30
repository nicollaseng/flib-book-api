import User from '../../models/User'
import Establishment from '../../models/Establishment'

export default async (req, res) => {
  let user = {};
  let establishment = {};
  try {
    user = await User.findById(req.body.id)
                      .select('-password')

    establishment = await Establishment.findById(req.body.establishment_id)
    user.establishment.push(establishment)

    await user.save()
    return res.json({user})
  } catch (err) {
    return res.status(500).json({err})
  }
}