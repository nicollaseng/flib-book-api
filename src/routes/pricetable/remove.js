import PriceTable from '../../models/PriceTable'

export default async (req, res) => {

  try {
    await PriceTable.findOneAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err){
    return res.status(500).json({err})
  }

}