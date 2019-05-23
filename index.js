import 'babel-polyfill'; //for promise, etc
import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', Auth.verifyToken, (req, res) => res.send('Hello user #' + res.locals.session_info.auth_user_id));

https.createServer({
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT)
  }, app)
  .listen(3003, function () {
    console.log('(https) app listening on port 3003!')
  });