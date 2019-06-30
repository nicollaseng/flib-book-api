import Params from './../../services/Parameters'

export default async (req, res) => {
  let parameter = {};
  try {
    parameter = Params(req.user.establishment)
    console.log(req.params.index)
    parameter = await parameter.get(req.params.index)
    return res.json({ parameter })
  } catch (err){
    return res.status(500).json({ parameter })
  }
}