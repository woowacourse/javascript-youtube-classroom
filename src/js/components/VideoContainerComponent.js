import Component from './Component';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

  constructor(parentElement, state) {
    super(parentElement, state);
    this.mount();
    this.$videoList = document.querySelector('.video-list');
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);

    // 초기 상태를 그린다.
    this.render();
  }

  render() {
    const { videoList } = this.state;

    videoList.forEach((video) => new VideoComponent(this.$videoList, { video }));
  }

  generateTemplate() {
    return `
    <section class="search-result">
        <h3 hidden>검색 결과</h3>
        <ul class="video-list"></ul>
    </section>
    `;
  }
}
export default VideoContainerComponent;
