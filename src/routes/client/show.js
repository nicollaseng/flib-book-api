import Client from '../../models/Client'

export default async (req, res) => {
  let client = {};
  try {
    client = await Client.findById(req.params.id)
    return res.json({client})
  } catch (err) {
    return res.status(404).json({err})
  }
}
