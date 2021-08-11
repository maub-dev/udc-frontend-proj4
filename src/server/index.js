const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/eval', requestMeaningCloud);

const requestMeaningCloud = (req, res) => {
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", req.body.text);
    formdata.append("lang", "en");
    
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    console.log('aqui')
    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
      .then(response => ({
        status: response.status, 
        body: response.json()
      }))
      .then(({ status, body }) => console.log(status, body))
      .catch(error => console.log('error', error));
};

requestMeaningCloud(new { body: new { text: 'For those who live in the West, the dangers of warming our planet are no longer something distant, impacting people in faraway places. Climate change is not a problem of the future, its here and now and affecting every region in the world, said Dr Friederike Otto from the University of Oxford, and one of the many authors on the UNs Intergovernmental Panel on Climate Change (IPCC) report. It is the confidence of the assertions that the scientists are now making that is the real strength of this new publication. The phrase very likely appears 42 times in the 40-odd pages of the Summary for Policymakers. In scientific terms, thats 90-100% certain that something is real.'}});