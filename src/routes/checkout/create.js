import CheckIn from '../../models/CheckIn'
import User from '../../models/User'
import Establishment from '../../models/Establishment'
import PriceTable from '../../models/PriceTable'
import CheckOut from '../../models/CheckOut';
import FinancialIncome from '../../models/FinancialIncome';

/**
 * API para criar um checkIn
 * @params: 
 */
export default async (req, res) => {
  try {
    let data = req.body
   
    let dataFinancial = {
    "title" : "Checkout de veiculo",
    "description" : "CheckOut ID: "+req.body.checkin_id ,
    "value" : req.body.value,
    "type" : "revenue",
    "category" : "CheckOut",
    "referer" : "C",
    "formOfPayment" : req.body.type,
    };
    
      

    data.checkIn = await CheckIn.findById(data.checkin_id)
    data.priceTable = await PriceTable.findById(data.pricetable_id)
    data.establishment = await Establishment.findById(req.user.establishment)
    data.user = await User.findById(req.user._id)

    let checkOut  = new CheckOut(data)
    await checkOut.save()

    let Financial = new FinancialIncome(dataFinancial)
    await Financial.save()

    let checkout = await CheckOut.findById(checkOut._id)
                          .populate('establishment')
                          .populate('checkIn')
                          .populate('user')
                          .select('-user.password')

    // Vamos fechar o checkIn para não aparecer na próxima consulta
    await CheckIn.findOneAndUpdate({_id: checkout.checkIn},{status: "closed"})
     

    //checkin.push({_id: checkin._id})

    return res.status(201)
            .json({ checkout })
  } catch (err){
    return res.status(500)
            .json({ err })
  }
}