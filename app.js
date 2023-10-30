require('dotenv').config()

const express = require('express');
const expressLayout = require('express-ejs-layouts')

const app = express();
const PORT = process.env.PORT || 5000;

// require('./database')(app);
var bodyParser = require('body-parser'); 

// This is the folder with css/images/js/ etc.
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')


app.use ('/', require('./server/routes/main'))


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})