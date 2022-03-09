// emit은 view에서 쓴다. element 커스텀이벤트를 붙여준다.
export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

export const on = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
};
