import QRCode from 'qrcode'
import { isNullOrUndefined } from 'util';

const sendImage = (res, image) => {
  var options = {
    root:'./public/Images/qrcode/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = image
  res.sendFile(fileName, options, function (err) {
    if (!isNullOrUndefined(err)) {
      console.error(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

  let PORT = process.env.APP_PORT || 3000
  let HOST = process.env.APP_HOST || '127.0.0.1'
  let HTTP = process.env.APP_HTTP || 'http'

  let imageUrl = HTTP+'://'+HOST+':'+PORT+'/images/qrcode/'+fileName

  return {imageUrl, res}
}

export default async (res, body) => {
  let text = '@'+body.text
  let type = body.type
  let qrcode = "NO BODY"

  switch (type) {
    case 'string':
      qrcode = await QRCode.toString(text)
      res = res.end(qrcode)
      break
    case 'url':
      qrcode = await QRCode.toDataURL(text)
      res = res.end(qrcode)
      break
    case 'image':
      await QRCode
                    .toFile('./public/Images/qrcode/'+text+'.png',text)
                    .then()
                    .catch((err) => {
                      if (isNullOrUndefined(err)) console.error(err)
                    })
      res = sendImage(res, text+'.png').res
      qrcode = sendImage(res, text+'.png').imageUrl
      break
    default:
      qrcode = await QRCode.toString(text)
      res = res.end(qrcode)
      break
  }

  text = qrcode
  return {res, text}
}