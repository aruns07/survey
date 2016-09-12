'use strict';

/**
 * Compare the format of recieved JSON
 * with questions structure.
 * All requried keys are present, no less, no more
 */
let referenceCompare = (data, baseData) => {

	let baseKeys = [];

	let userInfoHeading = baseData.userData.heading;
	baseData.userData.questions.forEach((question) => {
		baseKeys.push(userInfoHeading + '_' + question.text);
	});

	baseData.sections.forEach((section) => {
		let heading = section.heading;

		section.questions.forEach((question) => {
			baseKeys.push(heading + '_' + question.text);
		});
		
		baseKeys.push(heading + '_' + section.finalComment.text);
	});

	for (let reqDataKey in data) {
		if (baseKeys.indexOf(reqDataKey) === -1) {
			return false;
		}
	}
	return true;
};

let validate = (req, dataReference) => {
	if(!req.xhr) {
		return false;
	}

	if(!referenceCompare(req.body, dataReference)) {
		return false;
	}
	
	return true;
};

module.exports = validate;