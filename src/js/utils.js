export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const addEvent = (component, eventType, selector, callback) => {
  const children = [...component.querySelectorAll(selector)];
  const isTarget = (target) => children.includes(target) || target.closest(selector);

  component.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) {
      return false;
    }
    return callback(event);
  });
};

export const emit = (selector, eventName, detail, component = document) => {
  const event = new CustomEvent(eventName, { detail });
  const target = component.querySelector(selector);

  target.dispatchEvent(event);
};

export const on = (selector, eventName, handler, component = document) => {
  const target = component.querySelector(selector);

  target.addEventListener(eventName, handler);
};
