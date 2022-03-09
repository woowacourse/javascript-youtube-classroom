import { $ } from '../utils/dom.js';

export default class SearchResultView {
  constructor() {
    this.$videoList = $('.video-list');
    this.template = new Template();
  }

  renderVideo(videoItems) {
    const videosTemplate = videoItems.map((item) => this.template.getVideo(item)).join('');
    this.$videoList.insertAdjacentHTML('beforeend', videosTemplate);
  }
}
class Template {
  getThumbnail(imgUrl, videoId) {
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        img {
          object-fit: cover;
          width: 100%;
          height: 135px;
        }
      </style>
      <a href='https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1'>
        <img src=${imgUrl}>
      </a>
    `;
  }

  getVideo({ snippet, id }) {
    return `
    <li class="video-item" data-video-id="">
      <iframe 
        class="video-item__thumbnail" 
        srcdoc="${this.getThumbnail(snippet.thumbnails.high.url, id.videoId)}" 
        frameborder="0"
        allow="autoplay"
        allowfullscreen>
      </iframe>
      <h4 class="video-item__title">${snippet.title}</h4>
      <p class="video-item__channel-name">${snippet.channelTitle}</p>
      <p class="video-item__published-date">${snippet.publishTime}</p>
      <button class="video-item__save-button button">⬇ 저장</button>
    </li>
    `;
  }
}
