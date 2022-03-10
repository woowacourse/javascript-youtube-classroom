import { $, $$ } from '../util/dom.js';
import store from '../store/store.js';

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

const resetSearchInput = () => {
  $('#search-input-keyword').value = '';
};

export const resetVideoList = () => {
  $('.video-list').replaceChildren();
};

export const renderSkeletonUI = () => {
  $('.search-result').classList.remove('search-result--no-result');
  $('.no-result').hidden = true;
  $('.video-list').classList.remove('hide');
  $('.video-list').insertAdjacentHTML('beforeEnd', template.skeletonUI.repeat(10));
  resetSearchInput();
};

export const removeSkeletonUI = () => {
  $$('.skeleton').forEach(element => element.remove());
};

const removeSavedVideoButton = () => {
  const savedStore = store.getLocalStorage();
  if (savedStore) {
    savedStore.forEach(video => {
      if ($('.video-list').lastElementChild.dataset.videoId === video.id) {
        $('.video-list').lastElementChild.lastElementChild.hidden = true;
      }
    });
  }
};

export const renderVideoItems = ({ items }) => {
  removeSkeletonUI();

  items.forEach(item => {
    $('.video-list').insertAdjacentHTML('beforeEnd', template.videoItem(item));

    removeSavedVideoButton();
  });
};

export const renderNoResult = () => {
  removeSkeletonUI();
  $('.search-result').classList.add('search-result--no-result');
  $('.no-result').hidden = false;
  $('.video-list').classList.add('hide');
};

export const renderSearchResult = response => {
  response
    .then(data => {
      renderVideoItems(data);
    })
    .catch(() => {
      renderNoResult();
    });
};

export const renderNextSearchResult = response => {
  response.then(data => {
    renderVideoItems(data);
  });
};
