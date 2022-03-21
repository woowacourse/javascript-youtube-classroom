import { CLASSNAME } from './constants/contants.js';

import { savedVideoTemplate, emptyVideoListTemplate } from './template/videoTemplate.js';
import { selectDom, insertHtmlToElement } from './utils/handleElement.js';

class RenderVideo {
  constructor() {
    this.navSection = selectDom('.nav');
    this.unwatchedTabButton = selectDom('#unwatched-tab-button', this.navSection);
    this.watchedTabButton = selectDom('#watched-tab-button', this.navSection);
    this.savedVideoListContainer = selectDom('.saved-video-list');
    this.modalContainer = selectDom('.modal-container');
    this.videoListContainer = selectDom('.video-list', this.modalContainer);
  }

  onTabButtonClick = (clickedTabButton, anotherTabButton, videoList) => {
    clickedTabButton.classList.add(CLASSNAME.SELECTED_TAB_BUTTON);
    anotherTabButton.classList.remove(CLASSNAME.SELECTED_TAB_BUTTON);

    this.savedVideoListContainer.replaceChildren();
    if (!videoList.length) {
      insertHtmlToElement(this.savedVideoListContainer, 'afterbegin', emptyVideoListTemplate);
      return;
    }
    insertHtmlToElement(
      this.savedVideoListContainer,
      'afterbegin',
      videoList.map((video) => savedVideoTemplate(video)).join(' ')
    );
  };

  filterCheckedVideoFromSaveVideoList(isChecked = true) {
    return isChecked
      ? this.saveVideo.saveVideoList.filter((video) => video.isChecked)
      : this.saveVideo.saveVideoList.filter((video) => !video.isChecked);
  }
}

export default RenderVideo;
