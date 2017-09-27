import test from 'ava';
import m from '.';

test('main', t => {
	t.true(m({fooBar: true}, '-')['foo-bar']);
});

test('separator as an option', t => {
	t.true(m({fooBaz: true}, {separator: '-'})['foo-baz']);
});

test('default separator', t => {
	t.true(m({fooQux: true}).foo_qux);
});

test('exclude option', t => {
	t.true(m({barFoo: true}, {exclude: ['barFoo']}).barFoo);
});

test('deep option', t => {
	t.deepEqual(
		m({barBaz: true, obj: {barQux: false, arr: [{bazFoo: true}]}}, {deep: true}),
		// eslint-disable-next-line camelcase
		{bar_baz: true, obj: {bar_qux: false, arr: [{baz_foo: true}]}}
	);
});

test('deep option with separator as argument', t => {
	t.deepEqual(
		m({bazBar: true, obj: {bazQux: false, arr: [{quxFoo: true}]}}, '-', {deep: true}),
		{'baz-bar': true, obj: {'baz-qux': false, arr: [{'qux-foo': true}]}}
	);
});
