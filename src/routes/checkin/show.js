import CheckIn from '../../models/CheckIn'
import { isString } from 'util';

export default async (req, res) => {
  let checkin = {}
  try {
    let checkin = await CheckIn.findById(req.params.id)
                      .where({establishment: req.user.establishment})
                      .populate('estabelishment','services')
        
    return res.json({ checkin })
  } catch (err){
    return res.status(204).json({ checkin })
  }
}