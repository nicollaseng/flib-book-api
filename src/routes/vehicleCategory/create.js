import VehicleCategory from '../../models/VehicleCategory'

export default async (req, res) => {
  let vehicle  = new VehicleCategory(req.body)
  try {
    await  vehicle.save()
    return res.status(201)
        .json({ vehicle })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
