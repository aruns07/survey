'use strict';

let util = require('./server/util');
let model = require('./server/model');
let validateRequest = require('./server/requestValidation');
let express = require('express');
let exphbs = require('express-handlebars');
let app = express();

let fs = require('fs');
let bodyParser = require('body-parser');

require('./server/handlebars-config')(app, exphbs);

app.use(express.static('dist'));
app.use(bodyParser.json());

let questions = JSON.parse(fs.readFileSync('./data/questions.js'));

app.get('/', (req, res) => {
	res.render('home', questions);
});

app.post('/save', (req, res) => {
	if(!validateRequest(req, questions.data)) {
		res.sendStatus(400);
		return;
	}

	model.insert(req.body, (err, newDoc) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}

	});
	
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening on port '+ port);
});