import MainVideoCard from './MainVideoCard';

// const makeVideoInfo = (object, element) => {
//   object[snakeCaseToCamelCase(element.className.replace('video-item__', ''))] =
//     element.src ?? element.innerHTML;
//   return object;
// };

export default class MainVideoCardContainer {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
  }

  template() {
    return this.#state.videos.map((video) => new MainVideoCard(video).template()).join('');
  }

  render() {
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
