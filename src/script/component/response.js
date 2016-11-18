'use strict';

class Response {
	constructor(element) {  
	  this.element = element;
	  element.addEventListener('click', this.updateResponse.bind(this));
	}

	updateResponse(event) {
	  let elementName = event.target.nodeName;
	  if ( elementName === 'INPUT') {
	    let value = event.target.value.trim();
	    this.element.setAttribute('response', value);
	  }
	}

	get isValid() {
		return this.element.querySelector('input').validity.valid;
	}
}

module.exports = Response;