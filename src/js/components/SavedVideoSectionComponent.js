import VideoListComponent from './VideoListComponent';

class SavedVideoSectionComponent {
  #parentElement = null;

  #type = 'WATCH';

  #videoListComponent = null;

  constructor(parentElement, { type = 'WATCH' }) {
    this.#parentElement = parentElement;
    this.#type = type;
    this.#mount();
    this.#initDOM();
    this.#initChildrenComponent();
  }

  show() {
    this.$savedVideoSection.classList.remove('hide');
  }

  hide() {
    this.$savedVideoSection.classList.add('hide');
  }

  renderSavedVideoList(savedVideoResult) {
    this.#videoListComponent.renderSavedVideoList(savedVideoResult);
  }

  renderSkeletonUI(isWaiting) {
    this.#videoListComponent.renderSkeletonVideoList(isWaiting);
  }

  #mount() {
    const template = this.#generateTemplate(this.#type);
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$savedVideoSection = this.#parentElement.querySelector(
      `#${this.#type}-saved-video-section`
    );
  }

  #initChildrenComponent() {
    this.#videoListComponent = new VideoListComponent(this.$savedVideoSection);
  }

  #generateTemplate() {
    return `<div id="${this.#type}-saved-video-section" class="saved-video-section"></div>`;
  }
}
export default SavedVideoSectionComponent;
