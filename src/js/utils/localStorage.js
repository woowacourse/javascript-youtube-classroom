import { MESSAGE } from './constant.js';

export default {
  set: (key, value) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
      throw new Error(
        MESSAGE.ERROR.ONLY_STRING_OR_ARRAY_CAN_BE_STORED_IN_LOCAL_STORAGE,
      );
    }

    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => JSON.parse(localStorage.getItem(key)),
};
