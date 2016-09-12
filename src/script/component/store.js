'use strict';
let $ = require('jquery');

class Store {

	constructor(form, navigation) {

		this.$form = $(form);

		this.navigation = navigation;

		this.$submit = this.$form.find('.survey-form-submit');

		this.$submit.on('click', this.submitForm.bind(this));
	}

	submitForm(event) {
		event.preventDefault();
		let data = {};
		let $fields = this.$form.find('.survey-store');

		$fields.each(function(index) {
			let $field = $fields.eq(index);
			let fieldType = $field.data('survey-fieldtype');
			let fieldText = $field.data('survey-fieldtext');
			let fieldValue = '';

			if (fieldType === 'select') {
				fieldValue = $field.find('option:selected').text();
			} else if (fieldType === 'text') { 
				fieldValue = $field.val() || ' ';
			} else if (fieldType === 'radio') { 
				fieldValue = $field.find('input[type="radio"]:checked').val() || '0';
			}

			data[fieldText] = fieldValue;

		});

		$.ajax({
			url: '/save',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(()=> {
			console.log('Saved');
			this.navigation.moveNext(event);
		});
	}
}

module.exports = Store;