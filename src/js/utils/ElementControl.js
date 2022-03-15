const isNotHTMLElement = $element => $element instanceof HTMLElement === false;

export const onEnableButton = ($eventTarget, condition) => {
  if (isNotHTMLElement($eventTarget)) {
    return;
  }

  $eventTarget.disabled = !condition($eventTarget);
};

export const onObserveElement = ($element, handler) => {
  const scrollObserver = new IntersectionObserver(
    entry => {
      if (entry[0].isIntersecting) {
        handler();
      }
    },
    {
      threshold: 0.5,
    },
  );
  scrollObserver.observe($element);
};

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
