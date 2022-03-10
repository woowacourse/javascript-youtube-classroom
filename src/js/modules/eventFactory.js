// window에 커스텀 이벤트를 바인딩하고 있는데, 이 부분에서 문제가 발생하지 않는지..?
export const { bind, dispatch } = {
  bind(eventName, handler) {
    addEventListener(eventName, handler);
  },
  dispatch(eventName, detail = {}) {
    const customEvent = new CustomEvent(eventName, detail);
    dispatchEvent(customEvent);
  },
};
