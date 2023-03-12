const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.PORT || 10000;

app
  .use(bodyParser.json())
  
  .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
      } else {
        app.listen(port);
        console.log(`Connected to Book Database and listening on ${port}`);
      }
});