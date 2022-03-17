import {
  BUTTON_SAVED_TEXT,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  MAX_VIDEO_LIST_LENGTH,
} from './constants/contants.js';
import SaveVideo from './saveVideo.js';
import SearchVideo from './searchVideo.js';
import {
  videoTemplate,
  totalVideoSkeletonTemplate,
  videoNotFoundTemplate,
  savedVideoTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/handleElement.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.saveVideo = new SaveVideo();

    this.navSection = selectDom('.nav');
    this.playlistTabButton = selectDom('#playlist-tab-button', this.navSection);
    this.watchedTabButton = selectDom('#watched-tab-button', this.navSection);
    this.savedVideoListContainer = selectDom('.saved-video-list');

    this.modalContainer = selectDom('.modal-container');
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInput = selectDom('#search-input-keyword', this.searchForm);
    this.videoListContainer = selectDom('.video-list', this.modalContainer);
    this.searchResultSection = selectDom('.search-result', this.modalContainer);

    addEvent(this.navSection, 'click', this.#onNavButtonClick);
    addEvent(this.searchForm, 'submit', this.#onSearchFormSubmit);
    addEvent(this.videoListContainer, 'scroll', this.#onScrollVideoList);
    addEvent(this.videoListContainer, 'click', this.#onSaveButtonClick);

    this.savedVideoListContainer.insertAdjacentHTML(
      'afterbegin',
      this.saveVideo.saveVideoList
        .filter((video) => !video.isChecked)
        .map((video) => savedVideoTemplate(video))
        .join(' ')
    );
  }

  #onNavButtonClick = ({ target: { id: targetId } }) => {
    const navClickHandler = {
      'playlist-tab-button'() {
        this.#onTabButtonClick(
          this.playlistTabButton,
          this.watchedTabButton,
          this.saveVideo.saveVideoList.filter((video) => !video.isChecked)
        );
      },
      'watched-tab-button'() {
        this.#onTabButtonClick(
          this.watchedTabButton,
          this.playlistTabButton,
          this.saveVideo.saveVideoList.filter((video) => video.isChecked)
        );
      },
      'search-modal-button'() {
        this.modalContainer.classList.remove('hide');
      },
    };

    if (Object.keys(navClickHandler).includes(targetId)) {
      navClickHandler[targetId].call(this);
    }
  };

  #onTabButtonClick = (clickedTabButton, anotherTabButton, videoList) => {
    clickedTabButton.classList.add('selected');
    anotherTabButton.classList.remove('selected');

    this.savedVideoListContainer.replaceChildren();
    this.savedVideoListContainer.insertAdjacentHTML(
      'afterbegin',
      videoList.map((video) => savedVideoTemplate(video)).join(' ')
    );
  };

  #onScrollVideoList = () => {
    const { scrollHeight, offsetHeight, scrollTop, children: videoList } = this.videoListContainer;
    if (
      scrollHeight - offsetHeight === scrollTop &&
      Array.from(videoList).length < MAX_VIDEO_LIST_LENGTH &&
      this.searchVideo.nextPageToken !== ''
    ) {
      this.#loadVideo();
    }
  };

  #onSearchFormSubmit = (e) => {
    e.preventDefault();
    this.videoListContainer.scrollTop = 0;

    if (this.searchVideo.prevSearchKeyword === this.searchInput.value.trim()) {
      return;
    }

    this.searchVideo.initSearchVideo();
    this.videoListContainer.replaceChildren();
    this.videoListContainer.insertAdjacentHTML('afterbegin', totalVideoSkeletonTemplate);
    this.#loadVideo();
  };

  #onSaveButtonClick = ({ target }) => {
    const isSaveButton = target.classList.contains('video-item__save-button');
    if (isSaveButton && this.saveVideo.saveVideoList.length < MAX_SAVE_VIDEO_COUNT) {
      this.saveVideo.saveVideoInformationToStorage(target.closest('li').dataset);
      target.textContent = BUTTON_SAVED_TEXT;
      target.disabled = true;
      return;
    }
    if (isSaveButton) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
    }
  };

  #renderSearchVideo(searchVideo) {
    if (!searchVideo.length) {
      this.videoListContainer.replaceChildren();
      this.videoListContainer.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    Array.from(this.videoListContainer.children).forEach((videoLi) => {
      if (videoLi.classList.contains('skeleton')) {
        videoLi.classList.add('hide');
      }
    });

    selectDom('.skeleton', this.videoListContainer).insertAdjacentHTML(
      'beforebegin',
      searchVideo
        .map((video) =>
          videoTemplate(
            video,
            this.saveVideo.saveVideoList.some((saveVideo) => saveVideo.videoId === video.id.videoId)
          )
        )
        .join(' ')
    );
  }

  #renderVideoSkeleton() {
    Array.from(this.videoListContainer.children).forEach((videoLi) => {
      if (videoLi.classList.contains('skeleton')) {
        videoLi.classList.remove('hide');
      }
    });
  }

  async #loadVideo() {
    this.#renderVideoSkeleton();
    try {
      await this.searchVideo.handleSearchVideo(this.searchInput.value.trim());
      this.#renderSearchVideo(this.searchVideo.searchResults);
    } catch (error) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.videoListContainer.replaceChildren();

      this.searchVideo.initSearchVideo();
      alert(error);
    }
  }
}

export default RenderVideo;
