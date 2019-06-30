import Customer from '../../models/Customer'

export default async (req, res) => {
  let customer  = new Customer(req.body)
  try {
    await  customer.save()
    return res.status(201)
        .json({ customer })
  } catch (err){
    return res.status(500)
        .json({ err })
  }
}
