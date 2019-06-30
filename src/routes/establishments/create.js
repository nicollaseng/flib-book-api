import Establishment from '../../models/Establishment'

export default async (req, res) => {
  let establishment  = new Establishment(req.body)
  try {
    await  establishment.save()
    return res.status(201)
        .json({ establishment })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}