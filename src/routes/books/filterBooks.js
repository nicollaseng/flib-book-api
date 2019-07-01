require('dotenv')
const axios = require('axios');

export default async (req, res) => {
    try {
     axios.get(`https://www.googleapis.com/api/v1/report?entity=book&type=top-ten`)
      .then(response => res.send(response.data.items))
      .catch(err => res.send(err))
    } catch (err){
      console.log(err)
      return res.send({ error: 'Sorry, something went wrong :(' })
    }
}
