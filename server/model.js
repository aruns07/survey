'use strict';

let Nedb = require('nedb');
let argv = require('minimist')(process.argv.slice(2));

let storePath = './data/store.db';
if (argv.isDockerContainer) {
	storePath = '/usr/survey/data/store.db';
}

let model = new Nedb({ filename: storePath, autoload: true });

module.exports = model;