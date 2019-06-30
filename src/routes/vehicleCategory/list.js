import VehicleCategory from '../../models/VehicleCategory'

export default async (req, res) => {
  try {
    let vehicleCategory = await VehicleCategory.find({})
    return res.json({ vehicleCategory })
  } catch (err){
    return res.status(404).json({ vehicleCategory })
  }
}
