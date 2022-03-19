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
    this.element.addEventListener('click', this.clickButtonHanlder);
  }

  template() {
    return this.#state.videos.map((video) => new MainVideoCard(video).template()).join('');
  }

  clickButtonHanlder = (e) => {
    if (e.target.classList.contains('video-item__watch_button')) {
      console.log(e.target.closest('.video-item'));
      return;
    }
    if (e.target.classList.contains('video-item__delete_button')) {
      console.log(e.target.closest('.video-item'));
    }
  };

  checkWatchedVideoHandler = () => {};

  deleteWatchLaterVideoHandler = () => {};

  render() {
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
