import Service from '../../models/Service'

export default async (req, res) => {
  let service = {};
  try {
    service = await Service.findBydId(req.params.id)
                            .where({establishment: req.user.establishment})

    return res.json({ service })
  } catch (err){
    return res.json({ service })
  }
}
