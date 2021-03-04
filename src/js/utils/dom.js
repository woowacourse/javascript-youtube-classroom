export const $ = (function () {
  const constructor = function (selector) {
    if (!selector) return;
    this.elements = document.querySelectorAll(selector);
    this.element =
      this.elements.length === 1 && document.querySelector(selector);
  };

  constructor.prototype.setEvent = function (event, eventHandler) {
    this.each((element) => {
      element.addEventListener(event, eventHandler);
    });
  };

  constructor.prototype.dispatch = function (newEvent) {
    this.each((element) => {
      element.dispatchEvent(newEvent);
    });
  };

  constructor.prototype.each = function (callBack) {
    if (!callBack || typeof callBack !== 'function') {
      return;
    }
    this.elements.forEach((element, idx) => callBack(element, idx));

    return this;
  };

  constructor.prototype.show = function () {
    this.each((element) => element.classList.remove('d-none'));
  };

  constructor.prototype.hide = function () {
    this.each((element) => element.classList.add('d-none'));
  };

  constructor.prototype.setInnerHTML = function (template) {
    this.each((element) => (element.innerHTML = template));
  };

  constructor.prototype.addInnerHTML = function (template) {
    this.each((element) => (element.innerHTML += template));
  };

  constructor.prototype.addClass = function (className) {
    this.each((element) => element.classList.add(className));
  };

  constructor.prototype.removeClass = function (className) {
    this.each((element) => element.classList.remove(className));
  };

  constructor.prototype.getText = function (className) {
    if (!this.element) return;

    return this.element.innerText;
  };

  const instantiate = function (selector) {
    return new constructor(selector);
  };

  return instantiate;
})();
