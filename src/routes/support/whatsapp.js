import User from '../../models/User'

export default async (req, res) => {
  let users = [];
  try {
    users = await User.find({establishment: req.user.establishment}).populate("establishment")
    return res.json({users})
  } catch (err) {
    return res.status(500).json({err})
  }
}
