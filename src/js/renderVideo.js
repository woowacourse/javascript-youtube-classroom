import SearchVideo from './searchVideo.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.searchInput = selectDom('#search-input-keyword');
    this.searchButton = selectDom('#search-button');

    this.addEvents();
  }

  addEvents() {
    addEvent(this.searchModalButton, 'click', this.onSearchModalButtonClick);
    addEvent(this.searchButton, 'click', this.onSearchButtonClick);
  }

  onSearchModalButtonClick = () => {
    this.modalContainer.classList.remove('hide');
  };

  onSearchButtonClick = async () => {
    const searchKeyword = this.searchInput.value;
    try {
      await this.searchVideo.handleSearchVideo(searchKeyword);
      console.log(this.searchVideo.searchResults);
    } catch (error) {
      return alert(error);
    }
  };
}

export default RenderVideo;
