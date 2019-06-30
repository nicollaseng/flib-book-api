import Customer from '../../models/Customer'

export default async (req, res) => {

  try {
    await Customer.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err){
    return res.status(500).json({err})
  }

}
