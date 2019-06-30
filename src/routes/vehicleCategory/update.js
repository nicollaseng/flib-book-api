import VehicleCategory from '../../models/VehicleCategory'

export default async (req, res) => {
  try {
    await VehicleCategory.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200).end()
  } catch (err) {
    return res.status(500).json({err})
  }
}
