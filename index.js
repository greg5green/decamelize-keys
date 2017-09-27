'use strict';
var mapObj = require('map-obj');
var decamelize = require('decamelize');

var has = function (arr, key) {
	return arr.indexOf(key) > -1;
};

module.exports = function (input, separator, options) {
	if (typeof separator !== 'string') {
		options = separator;
		separator = null;
	}

	options = options || {};
	separator = separator || options.separator;
	var exclude = options.exclude || [];

	return mapObj(input, function (key, val) {
		if (!(exclude && has(exclude, key))) {
			var ret = decamelize(key, separator);

			key = ret;
		}

		return [key, val];
	}, {deep: options.deep});
};
