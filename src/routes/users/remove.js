import User from '../../models/User'

export default async (req, res) => {

  try {
    await User.findOneAndRemove(req.params.id)

    return res.status(204).end()
  } catch (err){
    return res.status(500).end()
  }

}