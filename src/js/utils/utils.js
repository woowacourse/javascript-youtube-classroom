const selectDom = (element, parent = document) => parent.querySelector(element);
const addEvent = (element, eventName, callback) => element.addEventListener(eventName, callback);

export { selectDom, addEvent };
