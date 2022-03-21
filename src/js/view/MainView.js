import { selectDom, formatDateString } from '../util/util';
import storage from '../domain/storage';
import { DELETE_CONFIRM_MESSAGE } from '../constants/constants';

class MainView {
  constructor() {
    this.savedVideosContainer = selectDom('.saved-videos-container');
    this.noSavedVideo = selectDom('.no-saved-video');
    this.renderSavedVideo(false);

    selectDom('#to-watch-tab').addEventListener('click', () => this.renderSavedVideo(false));
    selectDom('#watched-tab').addEventListener('click', () => this.renderSavedVideo(true));
  }

  #renderNoSavedVideo = () => {
    if (this.noSavedVideo) {
      this.noSavedVideo.classList.remove('hide');
    }
  };

  #handleCheck = (event) => {
    const savedVideoArray = storage.getSavedVideoArray();
    const watchedVideo = savedVideoArray.find(
      (video) => video.videoId === event.target.dataset.videoId
    );
    watchedVideo.isWatched = !watchedVideo.isWatched;
    storage.setSavedVideoArray(savedVideoArray);
    event.target.parentNode.parentNode.remove();
    if (
      savedVideoArray.filter((video) => String(video.isWatched) === event.target.dataset.isWatched)
        .length === 0
    ) {
      this.#renderNoSavedVideo();
    }
  };

  #handleDelete = (event) => {
    if (window.confirm(DELETE_CONFIRM_MESSAGE)) {
      const savedVideoArray = storage.getSavedVideoArray();
      const newVideoList = savedVideoArray.filter(
        (video) => video.videoId !== event.target.dataset.videoId
      );
      storage.setSavedVideoArray(newVideoList);
      event.target.parentNode.parentNode.remove();
      if (
        savedVideoArray.filter(
          (video) => String(video.isWatched) === event.target.dataset.isWatched
        ).length === 1
      ) {
        this.#renderNoSavedVideo();
      }
    }
  };

  #savedVideoElementTemplate = (video, isWatched) => `
      <img src="${video.thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${video.title}</h4>
      <p class="video-item__channel-name">${video.channelTitle}</p>
      <p class="video-item__published-date">${formatDateString(video.publishedAt)}</p>
      <div class="saved-item-button-container">
        <button
          class="saved-item-button check-button"
          data-video-id=${video.videoId}
          data-is-watched=${isWatched}>✅</button>
        <button
          class="saved-item-button delete-button"
          data-video-id=${video.videoId}
          data-is-watched=${isWatched}>🗑</button>
      </div>
    `;

  #createSavedVideoElement = (video, isWatched) => {
    const videoElement = document.createElement('li');
    videoElement.className = 'saved-video-item';
    videoElement.insertAdjacentHTML('beforeend', this.#savedVideoElementTemplate(video, isWatched));
    selectDom('.check-button', videoElement).addEventListener('click', this.#handleCheck);
    selectDom('.delete-button', videoElement).addEventListener('click', this.#handleDelete);
    return videoElement;
  };

  #removeFormerView = () => {
    const videoListElement = selectDom('.saved-video-list');
    if (videoListElement) {
      videoListElement.remove();
    }
    this.noSavedVideo.classList.add('hide');
  };

  renderSavedVideo = (isWatched) => {
    this.#removeFormerView();
    const videoArray = storage
      .getSavedVideoArray()
      .filter((video) => video.isWatched === isWatched);
    if (videoArray.length === 0) {
      this.#renderNoSavedVideo();
      return;
    }
    const savedVideoList = document.createElement('ul');
    savedVideoList.className = 'saved-video-list';
    const videoElementArray = videoArray.map((video) =>
      this.#createSavedVideoElement(video, isWatched)
    );
    savedVideoList.append(...videoElementArray);
    this.savedVideosContainer.append(savedVideoList);
  };
}

export default MainView;
