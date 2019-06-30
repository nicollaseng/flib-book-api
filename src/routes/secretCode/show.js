import SecretCode from '../../models/SecretCode'

export default async (req, res) => {
  let secretCode = {};
  try {
    secretCode = await SecretCode.findById(req.params.id)
    return res.json({secretCode})
  } catch (err) {
    return res.status(404).json({err})
  }
}
