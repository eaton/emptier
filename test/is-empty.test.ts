import { isEmpty } from '../src/index.js';
import test from 'ava';

test('undefined always empty', t => {
  t.assert(isEmpty(undefined));
  t.assert(isEmpty(undefined, { all: true }));
  t.assert(isEmpty(undefined, { none: true }));
});

test('null', t => {
  t.assert(isEmpty(null));
  t.assert(isEmpty(null, { all: true }));
  t.assert(!isEmpty(null, { null: false }));
  t.assert(!isEmpty(null, { none: true }));
});

test('array', t => {
  t.assert(isEmpty([]));
  t.assert(!isEmpty([], { array: false }));
  t.assert(isEmpty([], { all: true }));
  t.assert(!isEmpty([], { none: true }));
});

test('string', t => {
  t.assert(isEmpty(''));
  t.assert(!isEmpty('', { string: false }));
  t.assert(isEmpty('', { all: true }));
  t.assert(!isEmpty('', { none: true }));
});

test('object', t => {
  t.assert(isEmpty({}));
  t.assert(!isEmpty({}, { object: false }));
  t.assert(isEmpty({}, { all: true }));
  t.assert(!isEmpty({}, { none: true }));
});

test('map', t => {
  const val = new Map<string, string>();
  t.assert(isEmpty(val));
  t.assert(!isEmpty(val, { map: false }));
  t.assert(isEmpty(val, { all: true }));
  t.assert(!isEmpty(val, { none: true }));
});

test('set', t => {
  const val = new Set<string>();
  t.assert(isEmpty(val));
  t.assert(!isEmpty(val, { set: false }));
  t.assert(isEmpty(val, { all: true }));
  t.assert(!isEmpty(val, { none: true }));
});

test('buffer', t => {
  const val = Buffer.from('');
  t.assert(isEmpty(val));
  t.assert(!isEmpty(val, { buffer: false }));
  t.assert(isEmpty(val, { all: true }));
  t.assert(!isEmpty(val, { none: true }));
});

test('whitespace', t => {
  t.assert(!isEmpty(' \t\n '));
  t.assert(isEmpty(' \t\n ', { whitespace: true }));
  t.assert(isEmpty(' \t\n ', { all: true }));
  t.assert(!isEmpty(' \t\n ', { none: true }));
});

test('false', t => {
  t.assert(!isEmpty(false));
  t.assert(isEmpty(false, { false: true }));
  t.assert(isEmpty(false, { all: true }));
  t.assert(!isEmpty(false, { none: true }));
});

test('falsy', t => {
  t.assert(!isEmpty(0));
  t.assert(isEmpty(0, { falsy: true }));
  t.assert(isEmpty(0, { all: true }));
  t.assert(!isEmpty(0, { none: true }));
});

test('nan', t => {
  t.assert(!isEmpty(NaN));
  t.assert(isEmpty(NaN, { nan: true }));
  t.assert(isEmpty(NaN, { all: true }));
  t.assert(!isEmpty(NaN, { none: true }));
});

test('date', t => {
  const zeroDate = new Date(0);
  const nonZeroDate = new Date(Date.now());
  
  t.assert(!isEmpty(nonZeroDate));
  t.assert(!isEmpty(nonZeroDate, { date: true }));
  t.assert(!isEmpty(nonZeroDate, { date: false }));

  t.assert(isEmpty(zeroDate));
  t.assert(isEmpty(zeroDate, { date: true }));
  t.assert(!isEmpty(zeroDate, { date: false }));
});