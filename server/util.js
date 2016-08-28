//common utility functions

function identifyFirst(list) {
	return list.map((currentValue, index) => { 
				currentValue.isFirst = index === 0;
				return currentValue;
			});
}


module.exports = {
	identifyFirst: identifyFirst
};