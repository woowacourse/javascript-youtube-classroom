import { $modal, $videoWrapper } from '../elements.js';
import { STYLE_CLASS } from '../constants.js';
import { getVideoListTemplate, getSkeletonListTemplate } from './templates.js';

const view = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },
  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  },
  renderVideoItems(videos) {
    $videoWrapper.innerHTML = getVideoListTemplate(videos);
  },
  renderSkeletonItems() {
    $videoWrapper.innerHTML = getSkeletonListTemplate();
  },
};

export default view;
