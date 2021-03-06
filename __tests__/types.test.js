const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('validates for a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString('')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });

    it('boolean', () => {
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });

    it('isArray', () => {
      expect(isArray(3)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(['a', 'b'])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
    });

    it('object', () => {
      expect(isObject(3)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject({})).toBeTruthy();
      expect(isObject(() => {})).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
    });

    it('function', () => {
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(true)).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('can cast to string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString('3')).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString(() => {})).toEqual('() => {}');
    });

    it('can cast to boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(3)).toEqual(true);
      expect(castToBoolean('3')).toEqual(true);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
  });
});
