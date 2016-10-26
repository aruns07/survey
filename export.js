let util = require('./server/util');
let model = require('./server/model');
let path = require('path');
let fs = require('fs');
let crypto = require('crypto');
let jsonToCSV = require('json-to-csv');

let argv = require('minimist')(process.argv.slice(2));

if (argv.privateKeyPath && argv.privateKeyPath.length !== 0) {

	console.log('Private key path received ', argv.privateKeyPath);

	let absolutePath = path.resolve(argv.privateKeyPath);
    let privateKey = fs.readFileSync(absolutePath, "utf8");

	
	model.find({}, function (err, data) {

		
		let finalData = [];
		data.forEach((row) => {
			finalData.push(util.decryptData(row, privateKey));
		});

		jsonToCSV(finalData, 'export.csv');
		console.log('Data has been written in export.csv');


	});
} else {
	console.log('Please provide private key path with --privateKeyPath= option');
}

