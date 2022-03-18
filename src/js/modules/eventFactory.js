export const { bind, dispatch } = {
  bind(eventName, handler) {
    addEventListener(eventName, handler);
  },
  dispatch(eventName, detail = {}) {
    const customEvent = new CustomEvent(eventName, detail);
    dispatchEvent(customEvent);
  },
};
