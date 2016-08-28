'use strict';

let util = require('./server/util');
let express = require('express');
let exphbs = require('express-handlebars');
let app = express();
let fs = require('fs')

require('./server/handlebars-config')(app, exphbs);

app.use(express.static('dist'));

app.get('/', (req, res) => {
	let data = JSON.parse(fs.readFileSync('./data/questions.js'));
	res.render('home', data);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening on port '+ port);
});