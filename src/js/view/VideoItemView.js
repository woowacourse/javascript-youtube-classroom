import videoStorage from '../videoStorage.js';
import { DOM_STRING } from '../utils/constants.js';

export default class VideoItemView {
  constructor($element) {
    this.$element = $element;
  }

  setVideoItemTemplate(parseData) {
    const template = `
      <li class="video-item">
        <img
          src=${parseData.url}
          alt="video-item-thumbnail" class="video-item__thumbnail"
          loading="lazy" />
        <h4 class="video-item__title">${parseData.title}</h4>
        <p class="video-item__channel-name">${parseData.channelTitle}</p>
        <p class="video-item__published-date">${parseData.publishedAt}</p>
        <button data-videoid=${parseData.videoId} class="video-item__save-button button ${
      videoStorage.hasVideoId(parseData.videoId) ? `${DOM_STRING.HIDE}` : ''
    }">⬇ 저장</button>
      </li>
      `;

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  setSkeletonTemplate() {
    const template = `
    <li class="video-item">
      <div class="video-item__thumbnail skeleton"></div>
      <div class="video-item__title skeleton"></div>
      <div class="video-item__channel-name skeleton"></div>
      <div class="video-item__published-date skeleton"></div>
      <div class="video-item__save-button skeleton"></div>
    </li>
    `;

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }
}
