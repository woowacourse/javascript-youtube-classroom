export default function throttle(callback, delay) {
  let waiting = false;
  return (...args) => {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
}
