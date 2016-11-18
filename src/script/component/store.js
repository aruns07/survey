'use strict';
let $ = require('jquery');

class Store {

	constructor(form) {
		this.$form = $(form);
	}

	submitForm() {
		let data = {};
		let $fields = this.$form.find('.survey-store');

		$fields.each((index) => {
			let $field = $fields.eq(index);
			let fieldType = $field.data('survey-fieldtype');
			let fieldText = $field.data('survey-fieldtext');
			let fieldValue = '';

			if (fieldType === 'select') {
				fieldValue = $field.find('option:selected').text();
			} else if (fieldType === 'text') { 
				fieldValue = $field.val() || ' ';
			} else if (fieldType === 'radio-widget') { 
				fieldValue = $field.find('input[type="radio"]:checked').val() || '0';
			}

			data[fieldText] = fieldValue;

		});

		return $.ajax({
				url: '/save',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data)
			});
	}
}

module.exports = Store;