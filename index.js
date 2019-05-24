import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import libCrypto from './encryption/libCrypto.js'

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get('/', Auth.verifyToken, (req, res) => res.send('Hello user #' + res.locals.session_info.auth_user_id));
app.get('/', (req,res) => res.status(200).send('It worked'));
var cert = libCrypto.getHttpsCert();
https.createServer({
    key: cert.https_key,
    cert: cert.https_cert
  }, app)
  .listen(8080, function () {
    console.log('(https) app listening on port 8080!')
  });