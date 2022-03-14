const selectDom = (element, scope = document) => scope.querySelector(element);

const selectAllDom = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const addEvent = (target, eventName, callback) =>
  (Array.isArray(target)
    ? target.map((v) => v.addEventListener(eventName, callback))
    : target.addEventListener(eventName, callback));

export { selectDom, selectAllDom, addEvent };
