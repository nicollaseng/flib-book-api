import Monthly from '../../models/Monthly'

export default async (req, res) => {
  let monthly  = new Monthly(req.body)
  try {monthly
    await  monthly.save()
    return res.status(201)
        .json({ financial })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
