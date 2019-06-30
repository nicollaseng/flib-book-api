import PriceTable from '../../models/PriceTable'

export default async (req, res) => {
  let pricetable = {}
  try {
    let pricetable = await PriceTable.findById(req.params.id)
                      .where({establishment: req.user.establishment})
                      .populate('estabelishment','user')
        
    return res.json({ pricetable })
  } catch (err){
    return res.json({ pricetable })
  }
}