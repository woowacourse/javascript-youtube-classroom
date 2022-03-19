export const runAnimation = () =>
  new Promise(resolve => {
    requestAnimationFrame(resolve);
  });

export const addEventDelegate = (
  container,
  selector,
  { eventType, handler, defaultEvent = false },
) => {
  const children = [...container.querySelectorAll(selector)];
  const isTarget = target => children.includes(target) || target.closest(selector);

  container.addEventListener(eventType, event => {
    if (defaultEvent === true) event.preventDefault();
    if (!isTarget(event.target)) return false;
    handler(event);
  });
};

export const addEventOnce = (eventType, $element, callback) => {
  if ($element instanceof HTMLElement === false) {
    return;
  }

  $element.addEventListener(eventType, callback, {
    once: true,
  });
};
