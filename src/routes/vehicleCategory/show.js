import VehicleCategory from '../../models/VehicleCategory'

export default async (req, res) => {
  let vehicleCategory = {};
  try {
    vehicleCategory = await VehicleCategory.findById(req.params.id)
    return res.json({vehicleCategory})
  } catch (err) {
    return res.status(404).json({err})
  }
}
