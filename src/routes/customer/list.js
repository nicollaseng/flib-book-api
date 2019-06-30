import Customer from '../../models/Customer'

export default async (req, res) => {
  let customers = [];
  try {
    customers = await Customer.find({})
    return res.json({ customers })
  } catch (err){
    return res.status(204).json({ customers })
  }
}
