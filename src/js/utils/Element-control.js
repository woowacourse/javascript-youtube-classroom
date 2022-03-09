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
