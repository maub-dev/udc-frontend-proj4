var path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/evalText', async (req, res) => {
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("txt", req.body.text);
  formdata.append("lang", "en");
  
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  const result = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
  try {
    console.log(result)
    const response = await result.json();
    res.send(response)
    console.log(response)
  } catch (error) {
    console.log("error", err);
  }
});