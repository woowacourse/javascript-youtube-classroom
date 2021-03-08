export const $ = (function () {
  const constructor = function (selector) {
    if (!selector) {
      throw new Error('Custom DOM Library Error: selector must be declared!');
    }
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

  constructor.prototype.each = function (callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error(
        'Custom DOM Library Error: callback function must be declared!',
      );
    }
    this.elements.forEach((element, idx) => callback(element, idx));

    return this;
  };

  constructor.prototype.show = function () {
    this.each((element) => element.classList.remove('d-none'));
  };

  constructor.prototype.hide = function () {
    this.each((element) => element.classList.add('d-none'));
  };

  constructor.prototype.removeElement = function () {
    this.each((element) => element.remove());
  };

  constructor.prototype.setInnerHTML = function (template) {
    this.each((element) => (element.innerHTML = template));
  };

  constructor.prototype.addInnerHTML = function (template) {
    this.each((element) => element.insertAdjacentHTML('beforeend', template));
  };

  constructor.prototype.addClass = function (className) {
    this.each((element) => element.classList.add(className));
  };

  constructor.prototype.removeClass = function (className) {
    this.each((element) => element.classList.remove(className));
  };

  constructor.prototype.getText = function () {
    if (!this.element) {
      throw new Error('Custom DOM Library Error: no element existing!');
    }

    return this.element.innerText;
  };

  constructor.prototype.setText = function (text) {
    this.element.innerText = text;
  };

  constructor.prototype.setValue = function (value) {
    this.element.value = value;
  };

  const instantiate = function (selector) {
    return new constructor(selector);
  };

  return instantiate;
})();
