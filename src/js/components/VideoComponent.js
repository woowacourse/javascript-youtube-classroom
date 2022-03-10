import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import Component from './Component';
const observeOpt = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const callback = (en, obs) => {
  // 관찰 요소가 변화가 생기면 -> 수행된다.
  en.forEach((entry) => {
    if (entry.isIntersecting) {
      obs.unobserve(entry.target);
      dispatch(CUSTOM_EVENT_KEY.SCROLL_VIDEO_CONTAINER);
    }
  });
};

const io = new IntersectionObserver(callback, observeOpt);

class VideoComponent extends Component {
  $videoItem = null;

  constructor(parentElement, props) {
    super(parentElement);
    const { isLastVideo } = props;

    this.mount(props);
    this.initDOM(props);

    if (isLastVideo) {
      io.observe(this.$videoItem);
    }
  }

  mount({ video }) {
    const template = this.generateTemplate(video);
    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM({ video }) {
    const { videoId } = video.getVideoInfo();

    this.$videoItem = this.parentElement.querySelector(`[data-video-id="${videoId}"]`);
  }

  generateTemplate(video) {
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
