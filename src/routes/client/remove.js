import Client from '../../models/Client'

export default async (req, res) => {
  try {
    await Client.findByIdAndRemove(req.params.id)
    return res.status(200).end()
  } catch (err){
    return res.status(500).json({err})
  }
}
