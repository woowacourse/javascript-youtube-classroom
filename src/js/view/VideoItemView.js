import { skeletonTemplate, videoListTemplate } from './template.js';

export default class VideoItemView {
  constructor($element) {
    this.$element = $element;
  }

  renderSearchVideoList(parseData) {
    const template = videoListTemplate(parseData);

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }

  renderSkeletonList() {
    const template = skeletonTemplate();

    this.$element.textContent = '';
    this.$element.insertAdjacentHTML('afterbegin', template);
  }
}
