import Component from './Component';

class VideoComponent extends Component {
  state = null;

  constructor(parentElement, state) {
    super(parentElement);

    this.state = state;
    this.render();
  }

  render() {
    const template = this.generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  generateTemplate() {
    const { video } = this.state;
    const { videoId, videoTitle, channelTitle, publishTime, thumbnail } = video.getVideoInfo();

    return `
    <li class="video-item" data-video-id="${videoId}">
    <img
      src="${thumbnail}" class="video-item__thumbnail">
    <h4 class="video-item__title">${videoTitle}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
      `;
  }
}

export default VideoComponent;
