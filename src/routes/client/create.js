import Client from '../../models/Client'

export default async (req, res) => {
  let client  = new Client(req.body)
  try {
    await  client.save()
    return res.status(201)
        .json({ client })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
