import { $, $$ } from './general.js';

export const videoItemTemplate = {
  videoItem: (className, item) => {
    return `
      <li class="${className} video-item" data-video-id='${item.id}'>
      <img
        src='${item.snippet.thumbnails.high.url}'
        alt="video-item-thumbnail"
        class="video-item__thumbnail"
      />
      <h4 class="video-item__title">${item.snippet.title}</h4>
      <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
      <p class="video-item__published-date">${item.snippet.publishTime}</p>
      <div class="button-container ${className}-button-group">
          <button type="button" class="video-item__watched-button button">✅</button>
          <button type="button" class="video-item__delete-button button">🗑️</button>
      </div>
    </li>
      `;
  },
  emptyImageItem:
    '<div class="empty-img-container"><label for="empty-img" hidden>저장된 비디오가 없습니다! 비디오를 저장해주세요</label><img id="empty-img" name="empty-img" src="./assets/empty_img.png"/></div>',
};

export const removeSearchInput = () => {
  $('.search-input__keyword').textContent = '';
  $('.search-input__keyword').focus();
};

export const removeDeleteVideoItem = (selector, videoId) => {
  $$(selector).forEach(element => {
    if (element.dataset.videoId === videoId) {
      element.remove();
    }
  });
};

export const clearVideoItems = selector => {
  $$(selector).forEach(element => element.remove());
};

export const removeCheckedVideoItem = (selector, videoId) => {
  $$(selector).forEach(element => {
    if (element.dataset.videoId === videoId) {
      element.remove();
    }
  });
};

export const showEmptyImg = selector => {
  $(selector).insertAdjacentHTML('beforeEnd', videoItemTemplate.emptyImageItem);
};

export const removeEmptyImg = selector => {
  if ($(selector).hasChildNodes()) {
    $(selector).removeChild($(selector).firstChild);
  }
};
