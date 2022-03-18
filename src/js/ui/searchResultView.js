import { $, $$ } from '../util/dom.js';
import storage from '../storage/storage.js';
import { SEARCH_RESULT_COUNT } from '../constants/constants.js';

const template = {
  videoList: `
    <h3 hidden>검색 결과</h3>
    <ul class="video-list"></ul>
  `,
  skeletonUI: `
    <li class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </li>
  `,
  videoItem: (item) => {
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
  savedVideoItem: (item) => {
    return `
      <li class="video-item" data-video-id='${item.videoId}'>
        <img
          src='${item.thumbnails}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.title}</h4>
        <p class="video-item__channel-name">${item.channelTitle}</p>
        <p class="video-item__published-date">${item.publishTime}</p>
        <div class="video-manage-button">
          <button class="video-watched-button">✅</button>
          <button class="video-remove-button">🗑</button>
        </div>
      </li>
`;
  },
  noResult: `
    <h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="./assets/not_found.png" alt="no result image" class="no-result__image" />
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
  `,
};

const searchResultView = {
  toggleModal() {
    $('.modal-container').classList.toggle('hide');
  },
  resetVideoList() {
    $('.search-result').innerHTML = template.videoList;
  },
  renderSkeletonUI() {
    $('.video-list').insertAdjacentHTML(
      'beforeEnd',
      template.skeletonUI.repeat(SEARCH_RESULT_COUNT)
    );
  },
  removeSkeletonUI() {
    $$('.skeleton').forEach((element) => element.remove());
  },
  removeSavedVideoButton() {
    $('.video-list').lastElementChild.lastElementChild.hidden = true;
  },
  renderVideoItems({ items }) {
    const savedStorage = storage.getLocalStorage();
    items.forEach((item) => {
      $('.video-list').insertAdjacentHTML('beforeEnd', template.videoItem(item));
      if (savedStorage && savedStorage.find((data) => data.videoId === item.id.videoId)) {
        this.removeSavedVideoButton();
      }
    });
  },
  renderSearchResult(videoData) {
    this.removeSkeletonUI();
    if (videoData.items.length === 0) {
      $('.search-result').innerHTML = template.noResult;
      return;
    }
    this.renderVideoItems(videoData);
  },
  renderSavedVideos(savedVideos) {
    savedVideos.forEach((video) =>
      $('.saved-video-list').insertAdjacentHTML('beforeEnd', template.savedVideoItem(video))
    );
  },
};

export default searchResultView;
