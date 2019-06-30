import SecretCode from '../../models/SecretCode'

export default async (req, res) => {
  let secretCode  = new SecretCode(req.body)
  try {
    await  secretCode.save()
    return res.status(201)
        .json({ secretCode })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
