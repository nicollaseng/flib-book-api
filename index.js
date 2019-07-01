var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
import routes from './src/index'
var emoji = require('node-emoji')
require('dotenv').config()

var port = process.env.PORT || 5000

const app = express()

routes(app)
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.listen(port, () => {
  console.log(`Welcome ${emoji.get('rocket')} server running on port ${port}`);
});




