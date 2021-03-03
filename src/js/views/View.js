export default class View {
  constructor($element) {
    if (!$element) throw $element;
    this.$element = $element;
  }

  on(event, eventHandler) {
    this.$element.setEvent(event, eventHandler);
    return this;
  }

  emit(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatch(newEvent);
    return this;
  }
}
