import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import emoji from 'node-emoji'
import routes from './src'

require('dotenv').config()

var port = process.env.PORT || 5000

const app = express()

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Welcome ${emoji.get('rocket')} server running on port ${port}`);
});

routes(app)


