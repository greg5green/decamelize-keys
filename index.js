'use strict';
var mapObj = require('map-obj');
var decamelize = require('decamelize');

module.exports = function (obj, separator) {
	return mapObj(obj, function (key, val) {
		return [decamelize(key, separator), val];
	});
};
