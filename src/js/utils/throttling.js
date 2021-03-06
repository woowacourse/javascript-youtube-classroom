let timer;
export const throttling = (func) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func();
    }, 2000);
  }
};
