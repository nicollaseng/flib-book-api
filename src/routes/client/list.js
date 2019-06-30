import CheckIn from '../../models/CheckIn'

export default async (req, res) => {
  try {
    let checkin = await CheckIn.find({})
    return res.json({ checkin })
  } catch (err){
    return res.status(404).json({ checkin })
  }
}
