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
  const targets = component.querySelectorAll(selector);

  targets.forEach((target) => target.addEventListener(eventName, handler));
};

export const fetchData = async (url) => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const body = await response.json();

    if (!response.ok) throw new Error(body.error.message);

    return body;
  } catch (error) {
    return error;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const confirm = (text, callback) => {
  if (window.confirm(text)) {
    callback();
  }
};

export const deduplicate = (array) => {
  return array.filter(
    (element, index, array) => array.findIndex((target) => target.id === element.id) === index
  );
};
