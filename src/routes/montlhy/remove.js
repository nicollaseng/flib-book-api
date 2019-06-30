import Monthly from '../../models/Monthly'

export default async (req, res) => {

  try {
    await Monthly.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err){
    return res.status(500).json({err})
  }

}
