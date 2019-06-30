import CheckOut from '../../models/CheckIn'

export default async (req, res) => {
  let checkout = {}
  try {
    let checkout = await CheckOut.findById(req.params.id)
                      .where({establishment: req.user.establishment})
                      .populate('estabelishment','checkIn')
        
    return res.json({ checkout })
  } catch (err){
    return res.status(204).json({ checkout })
  }
}