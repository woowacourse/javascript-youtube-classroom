import { selectDom, formatDateString } from '../util/util';
import storage from '../domain/storage';

class MainView {
  constructor() {
    this.savedVideosContainer = selectDom('.saved-videos-container');
    this.noSavedVideos = selectDom('.no-saved-videos');
    this.renderSavedVideo(false);
  }

  #renderNoSavedVideo() {
    this.noSavedVideos.classList.remove('hide');
  }

  #handleCheck = (event) => {
    const savedVideos = storage
      .getSavedVideos()
      .filter((video) => String(video.isWatched) === event.target.dataset.isWatched);
    const watchedVideo = savedVideos.find(
      (video) => video.videoId === event.target.dataset.videoId
    );
    watchedVideo.isWatched = true;
    storage.setSavedVideos(savedVideos);
    event.target.parentNode.parentNode.remove();
    if (savedVideos.length === 1) {
      this.#renderNoSavedVideo();
    }
  };

  #handleDelete = (event) => {
    const savedVideos = storage
      .getSavedVideos()
      .filter((video) => String(video.isWatched) === event.target.dataset.isWatched);
    const newVideoList = savedVideos.filter(
      (video) => video.videoId !== event.target.dataset.videoId
    );
    storage.setSavedVideos(newVideoList);
    event.target.parentNode.parentNode.remove();
    if (savedVideos.length === 1) {
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

  renderSavedVideo(isWatched) {
    //아마도 엘리먼트를 다 지우는게 있어야 할 것 같음
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
