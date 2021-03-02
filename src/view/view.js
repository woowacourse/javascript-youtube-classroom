<<<<<<< HEAD
import { $modal } from '../elements.js';
import { STYLE_CLASS } from '../constants.js';

=======
import { $modal, $videoWrapper } from '../elements.js';
import { STYLE_CLASS } from '../constants.js';
import { getVideoListTemplate, getSkeletonListTemplate } from './templates.js';
>>>>>>> 0d61a8e (feat: 검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.)

const view = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },
  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
<<<<<<< HEAD
=======
  },
  renderVideoItems(videos) {
    $videoWrapper.innerHTML = getVideoListTemplate(videos);
  },
  renderSkeletonItems() {
    $videoWrapper.innerHTML = getSkeletonListTemplate();
>>>>>>> 0d61a8e (feat: 검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.)
  }
}

export default view;
