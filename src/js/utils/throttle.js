export default function throttle(callback, delay) {
  let ticking;

  return function () {
    if (ticking) return;

    ticking = setTimeout(() => {
      ticking = null;
      callback.apply(this, arguments);
    }, delay);
  };
}
