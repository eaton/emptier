import { isEmpty } from '../src/index.js';
import test from 'ava';

test('urls are not empty', t => {
  const u = new URL('https://www.cnn.com');
  t.is(isEmpty(u), false);
})