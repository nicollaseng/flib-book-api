import SecretCode from '../../models/SecretCode'

export default async (req, res) => {
  try {
    let secretCode = await SecretCode.find({})
    return res.json({ secretCode })
  } catch (err){
    return res.status(404).json({ secretCode })
  }
}
