import videoStore from '../storage/videoStore.js';
import { DOM_STRING } from '../utils/constants.js';

export default class VideoItemView {
  constructor($element) {
    this.$element = $element;
  }

  getMainTemplate(parseData) {
    return `
      <img 
        src=${parseData.url}
        alt="video-item-thumbnail" class="video-item__thumbnail" loading="lazy" />
      <h4 class="video-item__title">${parseData.title}</h4>
      <p class="video-item__channel-nagetVideoItemTemplateme">${parseData.channelTitle}</p>
      <p class="video-item__published-date ">${parseData.publishedAt}</p>
    `;
  }

  renderVideoItemTemplate(parseData) {
    const template = `
      ${this.getMainTemplate(parseData)}
      <button data-videoid=${parseData.videoId} class="video-item__save-button button 
      ${videoStore.hasVideoId(parseData.videoId) ? `${DOM_STRING.HIDE}` : ''}"> 
      ⬇ 저장
      </button>
    `;

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  renderWillSeeVideoItemTemplate(parseData) {
    const template = `
    ${this.getMainTemplate(parseData)}
    <div class="video-item-button-container">
      <button id="check-saw" class="check-saw-button video-item-button">✅</button>
      <button id="delete-store" class="delete-store-button video-item-button">🗑</button>
    </div>
    `;

    this.$element.setAttribute('data-videoid', parseData.videoId);
    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  renderSawVideoItemTemplate(parseData) {
    const template = `
    ${this.getMainTemplate(parseData)}
    <div class="video-item-button-container">
      <button id="check-will-see" class="check-will-see-button video-item-button">✅</button>
      <button id="delete-store" class="delete-store-button video-item-button">🗑</button>
    </div>
    `;

    this.$element.setAttribute('data-videoid', parseData.videoId);
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

  getElement() {
    return this.$element;
  }
}
