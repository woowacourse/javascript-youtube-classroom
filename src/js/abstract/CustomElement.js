class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return '';
  }

  setEvent() {}

  partialRender() {}
}

export default CustomElement;
