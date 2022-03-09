import { MAX_VIDEO_COUNT, MAX_VIDEO_LIST_LENGTH } from './constants/contants.js';
import SearchVideo from './searchVideo.js';
import {
  videoTemplate,
  videoSkeletonTemplate,
  videoNotFoundTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor() {
    this.onLoad = true;
    this.searchVideo = new SearchVideo();
    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.searchForm = selectDom('#search-form');
    this.searchInput = selectDom('#search-input-keyword', this.searchForm);
    this.videoListContainer = selectDom('.video-list');
    this.addEvents();
  }

  addEvents() {
    addEvent(this.searchModalButton, 'click', this.onSearchModalButtonClick);
    addEvent(this.searchForm, 'submit', this.onSearchFormSubmit);
    addEvent(this.videoListContainer, 'scroll', this.onScrollVideoList);
  }

  onScrollVideoList = () => {
    const { scrollHeight, offsetHeight, scrollTop } = this.videoListContainer;
    if (scrollHeight - offsetHeight === scrollTop && Array.from(selectDom('.video-list').children).length < MAX_VIDEO_LIST_LENGTH) {
      this.loadVideo();
    }
  };

  onSearchModalButtonClick = () => {
    this.modalContainer.classList.remove('hide');
  };

  onSearchFormSubmit = async (e) => {
    e.preventDefault();
    this.videoListContainer.innerHTML = '';
    this.loadVideo();
  };

  renderSearchVideo(searchVideo) {
    if (!searchVideo.length) {
      this.videoListContainer.innerHTML = videoNotFoundTemplate;
      return;
    }

    Array.from(selectDom('.video-list').children).forEach((child) => {
      if (child.className === 'skeleton') {
        child.remove();
      }
    });

    this.videoListContainer.insertAdjacentHTML(
      'beforeend',
      searchVideo.map((video) => videoTemplate(video)).join(' ')
    );
  }

  renderVideoSkeleton() {
    this.videoListContainer.insertAdjacentHTML(
      'beforeend',
      Array.from({ length: MAX_VIDEO_COUNT }, () => videoSkeletonTemplate).join(' ')
    );
  }

  loadVideo() {
    const searchKeyword = this.searchInput.value;
    this.renderVideoSkeleton();

    setTimeout(async () => {
      try {
        await this.searchVideo.handleSearchVideo(searchKeyword.trim());
        this.renderSearchVideo(this.searchVideo.searchResults);
      } catch (error) {
        this.searchInput.value = '';
        this.searchInput.focus();
        this.videoListContainer.innerHTML = '';
        return alert(error);
      }
    }, 500);
  }
}

export default RenderVideo;
