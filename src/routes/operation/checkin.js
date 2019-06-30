import CheckIn from '../../models/CheckIn'
import { isNullOrUndefined } from 'util';

export default async (req, res) => {
  let checkins = [];
  try {
    let where = isNullOrUndefined(req.body.where) ? null : JSON.parse(req.body.where)
    let order = isNullOrUndefined(req.body.orderBy) ? undefined : JSON.parse(req.body.orderBy)

    checkins = CheckIn.find({establishment: req.user.establishment}).populate('services') 

    if (where) {
      checkins = checkins.where(where)
    }

    if (isNullOrUndefined(order)) {
      checkins = checkins.sort({created_at: order})
    }
  
    checkins = await checkins
    return res.json({ checkins })
  } catch (err){
    return res.status(204).json({ checkins })
  }
}