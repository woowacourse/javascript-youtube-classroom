export const dispatch = (eventName, detail = {}, target = document) => {
  const customEvent = new CustomEvent(eventName, { detail });
  target.dispatchEvent(customEvent);
};
