'use strict';
let $ = require('jquery');

class Navigation {

	constructor(form) {
		this.STEPS_AFTER_SUBMIT = 1;

		this.$form = $(form);
		this.$formStepsList = this.$form.find('.survey-form-steps-list');
		this.$formSteps = this.$form.find('.survey-form-step');
		this.activeStep = 0;

		this.$control = this.$form.find('.survey-form-actions');
		this.$prev = this.$form.find('.survey-form-prev');
		this.$next = this.$form.find('.survey-form-next');
		this.$submit = this.$form.find('.survey-form-submit');

		this.bindEvent();
		this.setStepStage();
	}

	bindEvent() {
		this.$prev.on('click', this.moveBack.bind(this));
		this.$next.on('click', this.moveNext.bind(this));
		this.$submit.on('click', this.submitForm.bind(this));
	}

	moveBack(event) {
		event.preventDefault();
		if ( this.activeStep !== 0 ) {
			this.$formStepsList.addClass('animation-prev');

			window.setTimeout(() => {
				this.$formSteps.eq(this.activeStep).attr('aria-current', false);
				this.activeStep--;
				this.$formSteps.eq(this.activeStep).attr('aria-current', true);
				this.setStepStage();
				this.$formStepsList.removeClass('animation-prev');
			}, 500);
		}
	}

	moveNext(event) {
		event.preventDefault();
		if ( this.activeStep !== this.$formSteps.length - 1 ) {
			this.$formStepsList.addClass('animation-next');

			window.setTimeout(() => {
				this.$formSteps.eq(this.activeStep).attr('aria-current', false);
				this.activeStep++;
				this.$formSteps.eq(this.activeStep).attr('aria-current', true);
				this.setStepStage();
				this.$formStepsList.removeClass('animation-next');
			}, 500);
		}
	}

	setStepStage() {
		if ( this.activeStep === 0 ) {
			this.$control.removeClass('step-first step-mid step-submit step-last').addClass('step-first');
		} else if ( this.activeStep === this.$formSteps.length - 1 - this.STEPS_AFTER_SUBMIT) {
			this.$control.removeClass('step-first step-mid step-submit step-last').addClass('step-submit');
		}  else if ( this.activeStep === this.$formSteps.length - 1) {
			this.$control.removeClass('step-first step-mid step-submit step-last').addClass('step-last');
		} else {
			this.$control.removeClass('step-first step-mid step-submit step-last').addClass('step-mid');
		}
	}

	submitForm(event) {
		event.preventDefault();
	}
}

module.exports = Navigation;