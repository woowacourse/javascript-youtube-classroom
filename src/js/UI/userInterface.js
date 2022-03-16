import { $, $$ } from '../util/general.js';
import storage from '../storage/storage.js';

const template = {
  skeletonUI: `<li class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
</li>`,
  videoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id.videoId}'>
        <img
          src='${item.snippet.thumbnails.high.url}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${item.snippet.publishTime}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
  `;
  },
};

const userInterface = {
  resetSearchInput() {
    $('#search-input-keyword').value = '';
  },
  resetVideoList() {
    $('.video-list').replaceChildren();
  },
  renderSkeletonUI() {
    $('.search-result').classList.remove('search-result--no-result');
    $('.no-result').hidden = true;
    $('.video-list').classList.remove('hide');
    $('.video-list').insertAdjacentHTML('beforeEnd', template.skeletonUI.repeat(10));
    this.resetSearchInput();
  },
  removeSkeletonUI() {
    $$('.skeleton').forEach(element => element.remove());
  },
  removeSavedVideoButton() {
    const savedStorage = storage.getLocalStorage();
    if (savedStorage) {
      savedStorage.forEach(video => {
        if ($('.video-list').lastElementChild.dataset.videoId === video.id) {
          $('.video-list').lastElementChild.lastElementChild.hidden = true;
        }
      });
    }
  },
  renderVideoItems({ items }) {
    this.removeSkeletonUI();
    items.forEach(item => {
      $('.video-list').insertAdjacentHTML('beforeEnd', template.videoItem(item));
      this.removeSavedVideoButton();
    });
  },
  renderNoResult() {
    this.removeSkeletonUI();
    $('.search-result').classList.add('search-result--no-result');
    $('.no-result').hidden = false;
    $('.video-list').classList.add('hide');
  },
  renderSearchResult(response) {
    response.then(data => {
      if (data.items.length === 0) {
        this.renderNoResult();
        return;
      }
      this.renderVideoItems(data);
    });
  },
  renderNextSearchResult(response) {
    response.then(data => {
      this.renderVideoItems(data);
    });
  },
};

export default userInterface;
