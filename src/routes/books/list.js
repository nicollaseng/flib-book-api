require('dotenv')
const https = require('https');

export const searchBook =  (req, res) => {
  let book = req.body.search
  try {
    https.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&orderBy=newest&&printType=books&filter=partial&key=${process.env.GOOGLE_BOOKS_KEY}`)
  } catch (err){
    return res.status(404).json({ error: 'Sorry, something went wrong :(' })
  }
}
