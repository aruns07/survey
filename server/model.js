'use strict';

let Nedb = require('nedb');
let model = new Nedb({ filename: './data/store.db', autoload: true });

module.exports = model;