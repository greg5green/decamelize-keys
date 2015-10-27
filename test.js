import test from 'ava';
import decamelizeKeys from './';

test('decamelization', t => {
	t.ok(decamelizeKeys({fooBar: true}, '-')['foo-bar']);
	t.end();
});

test('default separator', t => {
	t.ok(decamelizeKeys({fooBar: true}).foo_bar);
	t.end();
});
