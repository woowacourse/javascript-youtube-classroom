let timer;
export const throttling = (func, event) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func(event);
    }, 3000);
  }
};
