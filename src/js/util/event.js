export const { on, emit } = {
  on(element, eventName, handler) {
    element.addEventListener(eventName, handler);
  },
  emit(element, eventName, data = {}) {
    const customEvent = new CustomEvent(eventName, {
      detail: data,
    });
    element.dispatchEvent(customEvent);
  },
};
