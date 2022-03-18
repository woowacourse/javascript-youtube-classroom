import { selectDom, formatDateString } from '../util/util';
import storage from '../domain/storage';

class MainView {
  constructor() {
    this.savedVideosContainer = selectDom('.saved-videos-container');
    this.noSavedVideos = selectDom('.no-saved-videos');
    this.renderSavedVideo();
  }

  #savedVideoTemplate(savedVideos) {
    return `
      ${savedVideos
        .map(
          (video) => `
        <li class=""video-item>
          <img src="${video.thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${formatDateString(video.publishedAt)}</p>
          <div class="saved-item-button-container">
            <button class="saved-item-button" id="check-button">✅</button>
            <button class="saved-item-button">🗑</button>
          </div>
        </li>
      `
        )
        .join('')}
    `;
  }

  #renderNoSavedVideo() {
    this.noSavedVideos.classList.remove('hide');
  }

  renderSavedVideo() {
    const savedVideos = storage.getSavedVideos();
    if (savedVideos.length === 0) {
      this.#renderNoSavedVideo();
      return;
    }
    const videoList = document.createElement('ul');
    videoList.className = 'video-list';
    videoList.insertAdjacentHTML('beforeend', this.#savedVideoTemplate(savedVideos));
    this.savedVideosContainer.append(videoList);
  }
}

export default MainView;
