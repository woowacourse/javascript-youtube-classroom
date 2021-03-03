export default class View {
  constructor($element) {
    if (!$element) throw $element;
    this.$element = $element;
  }

  on(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
    return this;
  }

  emit(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
    return this;
  }
}
