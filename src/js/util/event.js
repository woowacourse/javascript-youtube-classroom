export const dispatch = (eventName, detail = {}, target = document) => {
  const customEvent = new CustomEvent(eventName, { detail });
  target.dispatchEvent(customEvent);
};

export const addListener = (eventName, handler, target = document) => {
  target.addEventListener(eventName, handler);
};

