import CheckOut from '../../models/CheckOut'

export default async (req, res) => {

  try {
    await CheckOut.findByIdAndRemove(req.params.id)
    return res.status(202).end()
  } catch (err){
    return res.status(500).json({err})
  }

}