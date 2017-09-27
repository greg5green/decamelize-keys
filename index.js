'use strict';
const decamelize = require('decamelize');
const mapObj = require('map-obj');
const QuickLru = require('quick-lru');

const has = (arr, key) => arr.some(x => typeof x === 'string' ? x === key : x.test(key));
const cache = new QuickLru({maxSize: 100000});

module.exports = (input, separator, options) => {
	if (typeof separator !== 'string') {
		options = separator;
		separator = null;
	}

	options = options || {};
	separator = separator || options.separator;
	const exclude = options.exclude || [];

	return mapObj(input, (key, val) => {
		if (!(exclude && has(exclude, key))) {
			if (cache.has(key)) {
				key = cache.get(key);
			} else {
				const ret = decamelize(key, separator);

				if (key.length < 100) {
					cache.set(key, ret);
				}

				key = ret;
			}
		}

		return [key, val];
	}, {deep: options.deep});
};
