const isNotHTMLElement = $element => $element instanceof HTMLElement === false;

export const onEnableButton = ($eventTarget, condition) => {
  if (isNotHTMLElement($eventTarget)) {
    return;
  }

  if (condition($eventTarget) === false) {
    $eventTarget.disabled = true;
    return;
  }

  $eventTarget.disabled = false;
};

export const onObserveElement = ($element, handler) => {
  const scrollObserver = new IntersectionObserver(
    entry => {
      if (entry[0].isIntersecting) {
        handler();
      }
    },
    {
      threshold: 1.0,
    },
  );
  scrollObserver.observe($element);
};
