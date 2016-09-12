"use strict";

let $ = require('jquery');
let Response = require('./component/response.js');
let Navigation = require('./component/navigation.js');
let Store = require('./component/store.js');


let navigation = new Navigation($('.survey-form'));
let store = new Store($('.survey-form'), navigation);

let responseWidgets = $('.survey-response-widget');
responseWidgets.each(function(index) {
	let widget = responseWidgets.eq(index);
	widget.data('instance', new Response( widget[0] ));
});