import storage from '../storage/storage.js';
import { $, $$ } from '../util/general.js';

const watchLaterTemplate = {
  videoItem: item => {
    return `
        <li class="watch-later-video-item video-item" data-video-id='${item.id}'>
        <img
          src='${item.snippet.thumbnails.high.url}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${item.snippet.publishTime}</p>
        <div class="button-container">
            <button type="button" class="video-item__watched-button button">✅</button>
            <button type="button" class="video-item__delete-button button">🗑️</button>
        </div>
      </li>
        `;
  },
};

const watchLaterInterface = {
  renderWatchLaterVideos() {
    const savedVideoData = storage.getLocalStorage();
    if (!savedVideoData) {
      return;
    }
    savedVideoData.forEach(item => {
      if (item.watched === false) {
        $('.watch-later-videos-container ul').insertAdjacentHTML(
          'beforeEnd',
          watchLaterTemplate.videoItem(item),
        );
      }
    });
  },
  removeWatchLaterItems() {
    $$('.watch-later-video-item').forEach(element => element.remove());
  },
};

export default watchLaterInterface;
