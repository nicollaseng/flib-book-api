import CheckOut from '../../models/CheckOut'

export default async (req, res) => {
  let checkout = []
  try {
    let checkout = await CheckOut
                      .find({establishment: req.user.establishment})
                      .populate('establishment')
                      .populate('checkIn')
                      .populate('checkIn.services')
        
    return res.json({ checkout })
  } catch (err){
    return res.status(204).json({ checkout })
  }
}