const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isObject = val => typeof val === 'object' && !Array.isArray(val) ;


const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  const string = String(val);
  if(isString(val) === false) throw new CastError(String, val);
  return string;
};

const castToBoolan = val  => {
  if(isBoolean(val)) return val;
  const boolean = Boolean(val);
  if(!isBoolean(val)) throw new CastError(Boolean, val);
  return boolean;
};

const castToObject = val => {
  if(isObject(val)) return val;
  const object = Object(val);
  if(!isObject(val)) throw new CastError(Object, val);
  return object;
};
class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolan,
  Object: castToObject,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isObject,
  CastError,
  getCaster,
  castToNumber,
};
