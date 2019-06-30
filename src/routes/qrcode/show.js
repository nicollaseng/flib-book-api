import QRCode from './../../services/QRCode'

export default async (req, res) => {

  let qrcode = await QRCode(res, req.params)

  return qrcode.res
}