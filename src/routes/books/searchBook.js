require('dotenv')
const axios = require('axios');

export default async (req, res) => {
  let book = req.query.q

  console.log('LIVRO AQUI', book)

  const params = {
    q: book,
    key: process.env.GOOGLE_BOOKS_KEY
  };

  try {
   axios.get(`https://www.googleapis.com/books/v1/volumes`, { params })
    .then(response => res.send(response.data.items))
    .catch(err => res.send(err))
  } catch (err){
    console.log(err)
    return res.status(404).json({ error: 'Sorry, something went wrong :(' })
  }
}
