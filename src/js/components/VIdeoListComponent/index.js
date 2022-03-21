import SkeletonListComponent from './SkeletonListComponent';

class VideoListComponent {
  $videoList;

  parentElement = null;

  componentType = null;

  videoComponents = [];

  lazyLoadThrottleTimeout = null;

  skeletonListComponent = null;

  constructor(parentElement, type) {
    this.parentElement = parentElement;
    this.componentType = type;

    this.#mount();
    this.#initDOM();
    this.#bindEventHandler();
  }

  renderSkeletonVideoList(isWaitingResponse) {
    if (isWaitingResponse) {
      this.skeletonListComponent = new SkeletonListComponent(this.$videoList);
      return;
    }
    this.skeletonListComponent?.unmount();
  }

  unmount() {
    this.$videoList.innerHTML = '';
  }

  #mount() {
    const template = this.#generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$videoList = this.parentElement.querySelector('.video-list');
  }

  #generateTemplate() {
    return `<ul class="video-list"></ul>`;
  }

  #bindEventHandler() {
    this.$videoList.addEventListener('scroll', this.#onScrollInVideoContainer);
  }

  #onScrollInVideoContainer = () => {
    if (this.lazyLoadThrottleTimeout) {
      clearTimeout(this.lazyLoadThrottleTimeout);
    }
    this.lazyLoadThrottleTimeout = setTimeout(() => {
      this.videoComponents.forEach((videoComponent) => {
        const { bottom } = this.$videoList.getBoundingClientRect();
        videoComponent.loadImg(bottom);
      });
    }, 100);
  };
}
export default VideoListComponent;
