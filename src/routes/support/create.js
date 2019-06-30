import Support from '../../models/Support'
import { validateMobile } from '../../utils/validations'

export default async (req, res) => {
  let support  = new Support(req.body)
  if(validateMobile(support)){
    try {
      await  support.save()
      return res.status(201)
          .json({ support })
    } catch (err){
      return res.status(500)
          .json({ err })
    }
  } else {
    res.status(404)
  }
}
