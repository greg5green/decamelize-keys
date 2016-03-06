import test from 'ava';
import fn from './';

test('decamelization', t => {
	t.true(fn({fooBar: true}, '-')['foo-bar']);
});

test('default separator', t => {
	t.true(fn({fooBar: true}).foo_bar);
});
