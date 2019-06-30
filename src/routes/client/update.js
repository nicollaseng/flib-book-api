import Client from '../../models/Client'

export default async (req, res) => {
  try {
    await Client.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}
