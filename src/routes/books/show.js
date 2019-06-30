// import Customer from '../../models/Customer'

// export default async (req, res) => {
//   let customer = {};
//   try {
//     customer = await Customer.findById(req.params.id)
//                       .select('-password');
//     return res.json({customer})
//   } catch (err) {
//     return res.status(500).json({err})
//   }
// }
// // 
