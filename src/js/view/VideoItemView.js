import storageManager from '../managers/storageManager';
import { DOM_STRING } from '../utils/constants';

export default class VideoItemView {
  constructor($element) {
    this.$element = $element;
  }

  getVideoItemTemplate(parseData) {
    this.$element.innerHTML = `
    <li class="video-item" data-video-id="">
      <img
        src=${parseData ? parseData.url : ''}
        alt="video-item-thumbnail" class="video-item__thumbnail ${
          parseData ? '' : DOM_STRING.SKELETON
        }"
        loading="lazy">
      <h4 class="video-item__title ${parseData ? '' : DOM_STRING.SKELETON}">${
      parseData ? parseData.title : ''
    }</h4>
      <p class="video-item__channel-nagetVideoItemTemplateme ${
        parseData ? '' : DOM_STRING.SKELETON
      }">${parseData ? parseData.channelTitle : ''}</p>
      <p class="video-item__published-date ${parseData ? '' : DOM_STRING.SKELETON}">${
      parseData ? parseData.publishedAt : ''
    }</p>
      <button data-videoid=${
        parseData ? parseData.videoId : ''
      } class="video-item__save-button button ${parseData ? '' : DOM_STRING.SKELETON} ${
      parseData && storageManager.hasVideoID(parseData.videoId) ? `${DOM_STRING.HIDE}` : ''
    }"
      >${parseData ? '⬇ 저장' : ''}</button>
    </li>
    `;
  }
}
