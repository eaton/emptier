# Emptier

A thorough, configurable, zero-dependency Javascript emptiness check.

By default, `emptier` reproduces Loadash's [`_.isEmpty()`](https://lodash.com/docs/4.17.15#isEmpty) logic, without the weight of Lodash. Optional flags can also be passed in to define which values are considered 'empty', and to provide supply emptiness check functions for oddball classes.

## Installation

`npm install -s emptier`

## Usage

```ts
import { isEmpty } from 'emptier';

console.log(isEmpty(undefined)); // true
console.log(isEmpty(null)); // true
console.log(isEmpty('')); // true
console.log(isEmpty([])); // true
console.log(isEmpty(new Set())); // true
console.log(isEmpty(new Map())); // true
console.log(isEmpty(Buffer.from(''))); // true
console.log(isEmpty({})); // true
```

### Expanded checks

```ts
console.log(isEmpty(0, { zero: true })); // true
console.log(isEmpty(NaN, { nan: true })); // true
console.log(isEmpty('  \t\t\n', { whitespace: true })); // true
console.log(isEmpty(false, { false: true })); // true
console.log(isEmpty(-0, { falsy: true })); // true
```

### Custom checks

```ts
// Custom emptiness checks
const obj = new MyCustomWeirdClass(...);

function isMyClassEmpty(input: unknown) {
  return (obj implements MyCustomWeirdClass && obj.someFlag === undefined);
}

console.log(isEmpty(obj, { custom: isMyClassEmpty })); // true
```
