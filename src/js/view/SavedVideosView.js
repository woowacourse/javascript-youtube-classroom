import storage from '../domain/storage';
import getSearchResult from '../domain/VideoListAPI';
import { formatDateString, selectDom } from '../util/util';

class SavedVideosView {
  constructor() {
    this.savedVideos = selectDom('.saved-videos');
    this.videoList = selectDom('.video-list', this.savedVideos);
    this.renderedVideoIdArray = [];
    this.renderVideoList();
  }

  renderVideoList = async () => {
    const videos = storage.getFromStorage('unwatched');
    if (videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }
    const noSavedVideos = selectDom('.no-saved-videos');
    noSavedVideos?.remove();

    this.#removeDeletedVideos(videos);
    const newVideoIdArray = videos.filter((id) => !this.renderedVideoIdArray.includes(id));
    await this.#renderNewVideos(newVideoIdArray);
    this.renderedVideoIdArray = [...this.renderedVideoIdArray, ...newVideoIdArray];
  };

  async #renderNewVideos(newVideoIdArray) {
    const videoObjectArray = await getSearchResult(newVideoIdArray);
    const videoElementList = this.#createVideoElements(videoObjectArray);
    this.videoList.append(...videoElementList);
  }

  #removeDeletedVideos(videos) {
    const videosIdArray = videos || storage.getFromStorage('unwatched');
    const deletedVideoIdArray = this.renderedVideoIdArray.filter(
      (id) => !videosIdArray.includes(id)
    );
    this.videoList.childNodes.forEach((child) => {
      if (deletedVideoIdArray.includes(child.dataset.videoId)) {
        child.remove();
      }
    });
  }

  #createVideoElements(videoObjectArray) {
    return videoObjectArray.map((object) => {
      const element = document.createElement('li');
      element.className = 'video-item';
      element.dataset.videoId = object.videoId;
      element.innerHTML = this.#videoElementTemplate(object);
      element.addEventListener('click', this.#handleVideoItemButtons);
      return element;
    });
  }

  #renderNoSavedVideoTemplate() {
    this.videoList.innerHTML = '';
    if (!selectDom('.no-saved-videos')) {
      this.savedVideos.insertAdjacentHTML(
        'beforeend',
        `<div class="no-saved-videos">
        <p class="no-saved-videos__emoji">(⊙_⊙;))</p>
        <p class="no-saved-videos__description">
          저장된 영상이 없습니다! <br />
          우측 상단의 검색 버튼을 통해 영상을 검색한 뒤 저장해보세요!
        </p>
      </div>`
      );
    }
  }

  #handleVideoItemButtons = ({ target }) => {
    if (target.classList.contains('video-item__watched-button')) {
      this.#moveToWatchedList(target);
    }
    if (target.classList.contains('video-item__unsave-button')) {
      this.#unsaveVideo(target);
    }
  };

  #moveToWatchedList(target) {
    const { videoId } = target.dataset;
    storage.moveVideo({ from: 'unwatched', to: 'watched', value: videoId });
    this.#removeDeletedVideos();
  }

  #unsaveVideo(target) {
    const { videoId } = target.dataset;
    storage.removeFromStorage('unwatched', videoId);
    this.#removeDeletedVideos();
  }

  #videoElementTemplate = ({ videoId, thumbnail, title, channelTitle, publishedAt }) => `
  <img src="${thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail" />
  <h4 class="video-item__title">${title}</h4>
  <p class="video-item__channel-name">${channelTitle}</p>
  <p class="video-item__published-date">${formatDateString(publishedAt)}</p>
  <div class="video-item__button-wrapper">
    <button type="button" class="video-item__watched-button button" data-video-id="${videoId}">
      ✅
    </button>
    <button type="button" class="video-item__unsave-button button" data-video-id="${videoId}">
      🗑
    </button>
  </div>`;
}

export default SavedVideosView;
