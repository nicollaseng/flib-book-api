import CheckIn from '../../models/CheckIn'


export default async (req, res) => {
  try {
      let checkin = await CheckIn
                  .findOne({'vehicle.plate': req.params.plate})
                  .where({establishment: req.user.establishment, status: "open"})
    return res
            .json({ exists: !checkin ? false : true })
  } catch (err){
    return res
            .status(204)
            .json({ exists: false })
  }
}