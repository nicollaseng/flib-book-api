import CheckOut from '../../models/CheckOut'
import { isNullOrUndefined } from 'util';

export default async (req, res) => {
  let checkouts = [];
  try {
    let where = isNullOrUndefined(req.body.where) ? null : JSON.parse(req.body.where)
    let order = isNullOrUndefined(req.body.orderBy) ? undefined : JSON.parse(req.body.orderBy)

    checkouts = CheckOut.find({establishment: req.user.establishment})

    if (where) {
      checkouts = checkouts.where(where)
    }

    if (isNullOrUndefined(order)) {
      checkouts = checkouts.sort({created_at: order})
    }
  
    checkouts = await checkouts       
    return res.json({ checkouts })
  } catch (err){
    return res.status(204).json({ checkouts })
  }
}