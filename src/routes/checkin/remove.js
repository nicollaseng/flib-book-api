import CheckIn from '../../models/CheckIn'

export default async (req, res) => {

  try {
    await CheckIn.findByIdAndRemove(req.params.id)
    return res.status(202).end()
  } catch (err){
    return res.status(500).json({err})
  }

}