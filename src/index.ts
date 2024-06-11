import type { EmptyOptions, EmptyOptionsLoose } from "./options.js";
export type { EmptyOptions } from "./options.js"; 

export const emptyDefaults: EmptyOptions = {
  null: true,
  string: true,
  array: true,
  buffer: true,
  map: true,
  set: true,
  object: true,
  whitespace: false,
  zero: false,
  false: false,
  falsy: false,
  date: true,
}

/**
 * Test whether a value is empty or not, based on emptines criteria specified in
 * the options parameter.
 */
export function isEmpty(input: unknown, options: EmptyOptions = {}) {
  const opt = { ...emptyDefaults, ...options } as EmptyOptionsLoose;

  // Always, always, always treat undefined as undefined.
  if (input === undefined) return true;

  if (opt.none !== true) {
    // Null check
    if (input === null && (!!opt.all || !!opt.null)) return true;

    // Strings (zero-length and whitespace, whitespace not checked by default)
    if (typeof input === 'string' && input.length === 0 && (!!opt.all || !!opt.string)) return true;
    if (typeof input === 'string' && /^\s+$/.test(input) && (!!opt.all || !!opt.whitespace)) return true;

    // Numbers (NaN and 0, neither checked by default)
    if (typeof input === 'number' && isNaN(input) && (!!opt.all || !!opt.nan)) return true;
    if (input === 0 && (!!opt.all || !!opt.zero)) return true;

    // Special handling for Arrays, Buffers, Maps, and Sets; then other object types.
    if (Array.isArray(input)) {
      if (input.length === 0 && (!!opt.all || !!opt.array)) return true;
    } else if (Buffer.isBuffer(input)) {
      if (input.byteLength === 0 && (!!opt.all || !!opt.buffer)) return true
    } else if (input instanceof Map) {
      if (input.size === 0 && (!!opt.all || !!opt.map)) return true;
    } else if (input instanceof Set) {
      if (input.size === 0 && (!!opt.all || !!opt.set)) return true;
    } else if (input instanceof Date) {
      if (input.valueOf() === 0 && (!!opt.all || !!opt.date)) return true;
    } else if (typeof input === 'object') {
      if (input !== null && Object.keys(input).length === 0 && (!!opt.all || !!opt.object)) return true;
    }

    // Explicit false value; not checked by default.
    if (input === false && !!opt.all || !!opt.false) return true;

    // Falsey value; not checked by default.
    if (!input && (!!opt.all || !!opt.falsy)) return true;
  }
  
  // Any other custom checks
  if (opt.custom) {
    if (opt.custom(input, opt)) return true;
  }

  return false;
}
