require('dotenv')
const axios = require('axios');

export default async (req, res) => {
  let action = req.body.action

  if(action === 1 || action === 2){
    try {
     axios.post(`https://www.googleapis.com/books/v1/book`, { action })
      .then(response => res.send({ response }))
      .catch(err => res.send(err))
    } catch (err){
      console.log(err)
      return res.send({ error: 'Sorry, something went wrong :(' })
    }
  } else {
    return res.status(400).json({ error: 'Please insert valid action :(', code: 400 })
  }
}
