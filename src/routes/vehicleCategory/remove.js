import VehicleCategory from '../../models/VehicleCategory'

export default async (req, res) => {
  try {
    await VehicleCategory.findByIdAndRemove(req.params.id)
    return res.status(200).end()
  } catch (err){
    return res.status(500).json({err})
  }
}
