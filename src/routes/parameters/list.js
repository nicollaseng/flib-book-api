import Params from './../../services/Parameters';

export default async (req, res) => {
  let parameters = [];
  try {
    parameters = Params(req.user.establishment)
    parameters = await parameters.list()

    return res.json({ parameters })
  } catch (err){
    return res.status(500).json({ parameters })
  }
}