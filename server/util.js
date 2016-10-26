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
	for (let key in object) {
		buffer = new Buffer(object[key]);
		encrypted = crypto.publicEncrypt(publicKey, buffer);
		encryptedData[key] = encrypted.toString('base64');
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