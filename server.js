
const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', require('./routes'))

app.get('/styles/index.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile('styles/index.css', { root: __dirname });
});

/*app.listen(port, () => {
    console.log(`Running on port ${port}`)
})*/

module.exports = app;