import User from '../../models/User'
import Establishment from '../../models/Establishment'

const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
    return false;
  }
  return true;
}

export default async (req, res) => {
  let user = new User(req.body)
  user.password = user.hashPassword(user.password)
  user.isAdmin = true
  try {
    //return res.json(req.body)
    await user.save()

    if ("establishment_create" in req.body) {
      let establishment = new Establishment(JSON.parse(req.body.establishment_create))
      return res.status(500)
      .json({ establishment })
        await establishment.save()
        await User.findByIdAndUpdate(user._id, {establishment: establishment})

    }

    if ("establishment_id" in req.params) {
      establishment = await Establishment.findById(req.params.establishment_id)
      await User.findByIdAndUpdate(user._id, {establishment: establishment})
    }

    user = await User
        .findById(user._id)
        .populate('establishment')
        .select('-password')

    return res.status(201)
        .json({ user })
  } catch (err) {
    return res.status(500)
        .json({ err })
  }
}
