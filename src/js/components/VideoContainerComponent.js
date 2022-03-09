import Component from './Component';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  constructor(parentElement, state) {
    super(parentElement, state);
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    const { videoList } = this.state;

    const template = this.generateTemplate();

    this.parentElement.innerHTML = template;

    const videoListElement = document.querySelector('.video-list');

    videoList.forEach((video) => new VideoComponent(videoListElement, { video }));
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
