import Whatsapp from '../../models/Whatsapp'
import Client from '../../models/Client'

import { validateMobile } from '../../utils/validations'
import { whatsappFormatter } from '../../utils/formatter'

export default async (req, res) => {
  let whatsapp  = new Whatsapp(req.body)
  let mobile = req.body.mobile
  let text = whatsappFormatter(req.body.text)
  if(validateMobile(mobile)){
    let client = Client.find({ mobile:mobile })
    if(client){
      whatsapp.clientId = client.id
    }
    try {
      await  whatsapp.save()
      return res.status(201).json({ url: `https://api.whatsapp.com/send?phone=${mobile}&text=${text}` })
    } catch (err){
      return res.status(500).json({ err })
    }
  }
}
