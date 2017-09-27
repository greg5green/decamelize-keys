'use strict';
var decamelize = require('decamelize');
var mapObj = require('map-obj');
var QuickLru = require('quick-lru');

var has = function (arr, key) {
	return arr.indexOf(key) > -1;
};
var cache = new QuickLru({maxSize: 100000});

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
			if (cache.has(key)) {
				key = cache.get(key);
			} else {
				var ret = decamelize(key, separator);

				if (key.length < 100) {
					cache.set(key, ret);
				}

				key = ret;
			}
		}

		return [key, val];
	}, {deep: options.deep});
};
