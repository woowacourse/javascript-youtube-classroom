export const $ = (function () {
  const constructor = function (selector) {
    if (!selector) return;
    this.elements = document.querySelectorAll(selector);
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

  const instantiate = function (selector) {
    return new constructor(selector);
  };

  return instantiate;
})();
