/* eslint-disable no-console */
export const throttle = (callback, delay = 0) => {
  let timerId = null;

  return (...args) => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback(...args);

      timerId = null;
    }, delay);
  };
};

export const debounce = (callback, wait = 0) => {
  let timerId = null;

  return (...args) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const grouper = (callback, label, avoid = false) => {
  if (avoid) {
    callback((_) => _);

    return;
  }

  console.group(label);

  try {
    callback(console.log);
  } finally {
    console.groupEnd();
  }
};

export const removeDuplicatedElements = (array, key) => {
  const uniqueMap = array.reduce((map, obj) => {
    if (!Object.prototype.hasOwnProperty.call(obj, key))
      throw new Error('invalid key');

    map.set(obj[key], obj);

    return map;
  }, new Map());

  return Array.from(uniqueMap.values());
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const deepEqual = (a, b) => {
  if (a === b) return true;

  // eslint-disable-next-line eqeqeq
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (Array.isArray(a)) {
      return (
        a.length === b.length &&
        a.every((elem, index) => deepEqual(elem, b[index]))
      );
    }

    if (a instanceof Set && b instanceof Set) {
      return (
        a.size === b.size &&
        Array.from(a.entries()).every(([key]) => b.has(key))
      );
    }

    if (a instanceof Map && b instanceof Map) {
      return (
        a.size === b.size &&
        Array.from(a.entries()).every(([key, value]) => {
          return b.has(key) && deepEqual(value, b.get(key));
        })
      );
    }

    const keys = {
      a: Object.keys(a),
      b: Object.keys(b),
    };

    return (
      a.constructor === b.constructor &&
      keys.a.length === keys.b.length &&
      keys.a.some((key) => Object.prototype.hasOwnProperty.call(b, key)) &&
      keys.a.every((key) => deepEqual(a[key], b[key]))
    );
  }

  // 둘 다 NaN이면 true, 아니면 false
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
};
