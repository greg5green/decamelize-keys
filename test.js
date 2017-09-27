import test from 'ava';
import m from '.';

test('main', t => {
	t.true(m({fooBar: true}, '-')['foo-bar']);
});

test('separator as an option', t => {
	t.true(m({fooBar: true}, {separator: '-'})['foo-bar']);
});

test('default separator', t => {
	t.true(m({fooBar: true}).foo_bar);
});

test('exclude option', t => {
	t.true(m({fooBar: true}, {exclude: ['fooBar']}).fooBar);
});

test('deep option', t => {
	t.deepEqual(
		m({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);
});

test('deep option with separator as argument', t => {
	t.deepEqual(
		m({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, '-', {deep: true}),
		{'foo-bar': true, obj: {'one-two': false, arr: [{'three-four': true}]}}
	);
});
