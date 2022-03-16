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
