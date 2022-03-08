import SearchVideo from './searchVideo.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    addEvent(this.searchModalButton, 'click', this.onSearchModalButtonClick.bind(this));
  }

  onSearchModalButtonClick() {
    this.modalContainer.classList.remove('hide');
  }
}

export default RenderVideo;
