class Component {
  parentElement;

  state;

  constructor(parentElement, state) {
    this.parentElement = parentElement;
    this.state = state;
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {}

  generateTemplate() {}
}
export default Component;
