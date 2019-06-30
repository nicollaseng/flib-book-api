import Service from '../../models/Service'

export default async (req, res) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}