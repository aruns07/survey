//common utility functions

let crypto = require('crypto');

function identifyFirst(list) {
	return list.map((currentValue, index) => { 
				currentValue.isFirst = index === 0;
				return currentValue;
			});
}

function encryptData(object, publicKey) {
	let encryptedData = {};
	let buffer;
	let encrypted;
	let inputLength;
	let inputSplitCols;
	let inputSplitedPart;
	const INPUT_SPLIT_LIMIT = 200;
	for (let key in object) {
		inputLength = object[key].length;
		if(inputLength > INPUT_SPLIT_LIMIT) {

			inputSplitCols = Math.ceil(inputLength / INPUT_SPLIT_LIMIT);

			for (let cols = 0; cols < inputSplitCols; cols++ ) {

				inputSplitedPart = object[key].substr(cols * INPUT_SPLIT_LIMIT, INPUT_SPLIT_LIMIT);

				buffer = new Buffer(inputSplitedPart);
				encrypted = crypto.publicEncrypt(publicKey, buffer);
				encryptedData[key + (cols === 0 ? '' : '_' + cols)] = encrypted.toString('base64');
			}

		} else {
			buffer = new Buffer(object[key]);
			encrypted = crypto.publicEncrypt(publicKey, buffer);
			encryptedData[key] = encrypted.toString('base64');
		}
	}
	return encryptedData;
}

function decryptData(object, privateKey) {
	let finalData = {};
	let buffer;
	let decrypted;
	for (let key in object) {
		if (key !== '_id') {
			buffer = new Buffer(object[key], 'base64');
			decrypted = crypto.privateDecrypt(privateKey, buffer);
			finalData[key] = decrypted.toString('utf8');
		}
	}
	return finalData;
}

module.exports = {identifyFirst, encryptData, decryptData};