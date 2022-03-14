import storageManager from '../managers/storageManager.js';
import { CLASS_NAME_STRING } from '../utils/constants.js';

export default class VideoItemView {
  constructor($element) {
    this.$element = $element;
  }

  renderVideoItemTemplate(parseData) {
    const template = `
      <img 
        src=${parseData.url}
        alt="video-item-thumbnail" class="video-item__thumbnail" loading="lazy" />
      <h4 class="video-item__title">${parseData.title}</h4>
      <p class="video-item__channel-nagetVideoItemTemplateme">${parseData.channelTitle}</p>
      <p class="video-item__published-date ">${parseData.publishedAt}</p>
      <button data-videoid=${parseData.videoId} class="video-item__save-button button 
      ${storageManager.hasVideoID(parseData.videoId) ? `${CLASS_NAME_STRING.HIDE}` : ''}"> 
      ⬇ 저장
      </button>
    `;

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  renderSkeletonTemplate() {
    const template = `
      <div class="video-item__thumbnail skeleton"></div>
      <div class="video-item__title skeleton"></div>
      <div class="video-item__channel-nagetVideoItemTemplateme skeleton"></div>
      <div class="video-item__published-date skeleton"></div>
      <div class="video-item__save-button button skeleton"></div>
    `;

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  deleteTemplate() {
    this.$element.textContent = '';
  }
}
