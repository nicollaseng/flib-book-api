require('dotenv')
const axios = require('axios');

export default async (req, res) => {
  let book = req.query.q

  if(book){
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
  } else {
    return res.status(404).json({ error: 'Please insert valid parameter :(' })
  }
}
