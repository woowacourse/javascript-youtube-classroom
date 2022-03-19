import { selectDom, formatDateString } from '../util/util';
import storage from '../domain/storage';

class MainView {
  constructor() {
    this.savedVideosContainer = selectDom('.saved-videos-container');
    this.noSavedVideos = selectDom('.no-saved-videos');
    this.renderSavedVideo(false);

    selectDom('#to-watch-tab').addEventListener('click', () => this.renderSavedVideo(false));
    selectDom('#watched-tab').addEventListener('click', () => this.renderSavedVideo(true));
  }

  #renderNoSavedVideo() {
    if (this.noSavedVideos) {
      this.noSavedVideos.classList.remove('hide');
    }
  }

  #handleCheck = (event) => {
    const savedVideos = storage.getSavedVideos();
    const watchedVideo = savedVideos.find(
      (video) => video.videoId === event.target.dataset.videoId
    );
    watchedVideo.isWatched = true;
    storage.setSavedVideos(savedVideos);
    event.target.parentNode.parentNode.remove();
    if (
      savedVideos.filter((video) => String(video.isWatched) === event.target.dataset.isWatched)
        .length === 0
    ) {
      this.#renderNoSavedVideo();
    }
  };

  #handleDelete = (event) => {
    const savedVideos = storage.getSavedVideos();
    const newVideoList = savedVideos.filter(
      (video) => video.videoId !== event.target.dataset.videoId
    );
    storage.setSavedVideos(newVideoList);
    event.target.parentNode.parentNode.remove();
    if (
      savedVideos.filter((video) => String(video.isWatched) === event.target.dataset.isWatched)
        .length === 1
    ) {
      this.#renderNoSavedVideo();
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
    videoElement.className = 'video-item';
    videoElement.insertAdjacentHTML('beforeend', this.#savedVideoElementTemplate(video, isWatched));
    selectDom('.check-button', videoElement).addEventListener('click', this.#handleCheck);
    selectDom('.delete-button', videoElement).addEventListener('click', this.#handleDelete);
    return videoElement;
  };

  #removeVideoList = () => {
    const videoListElement = selectDom('.saved-video-list');
    if (videoListElement) {
      videoListElement.remove();
    }
  };

  renderSavedVideo(isWatched) {
    this.#removeVideoList();
    this.noSavedVideos.classList.add('hide');
    const videoList = storage.getSavedVideos().filter((video) => video.isWatched === isWatched);
    if (videoList.length === 0) {
      this.#renderNoSavedVideo();
      return;
    }
    const savedVideoList = document.createElement('ul');
    savedVideoList.className = 'saved-video-list';
    const videoElementArray = videoList.map((video) =>
      this.#createSavedVideoElement(video, isWatched)
    );
    savedVideoList.append(...videoElementArray);
    this.savedVideosContainer.append(savedVideoList);
  }
}

export default MainView;
