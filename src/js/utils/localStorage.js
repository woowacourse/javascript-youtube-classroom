import { MESSAGE } from './constant.js';

const isString = (value) => typeof value === 'string';
const isArray = (value) => Array.isArray(value);
const isObject = (value) => typeof value === 'object' && value !== null;

export default {
  set: (key, value) => {
    if (!(isString(value) || isArray(value) || isObject(value))) {
      throw new Error(
        MESSAGE.ERROR.ONLY_STRING_OR_ARRAY_CAN_BE_STORED_IN_LOCAL_STORAGE,
      );
    }

    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => JSON.parse(localStorage.getItem(key)),
};
