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
