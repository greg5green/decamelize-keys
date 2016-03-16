import test from 'ava';
import fn from './';

test('decamelization', t => {
	t.true(fn({fooBar: true}, '-')['foo-bar']);
});

test('separator as an option', t => {
	t.true(fn({fooBar: true}, {separator: '-'})['foo-bar']);
});

test('default separator', t => {
	t.true(fn({fooBar: true}).foo_bar);
});

test('exclude key', t => {
	t.true(fn({fooBar: true}, {exclude: ['fooBar']}).fooBar);
});
