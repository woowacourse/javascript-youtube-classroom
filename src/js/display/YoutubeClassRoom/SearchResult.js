import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { onObserveElement } from '@Utils/elementController';
import { YOUTUBE_SETTING, YOUTUBE_SEARCH_ACTION, ERROR_MESSAGE } from '@Constants';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import notFoundImage from '@Images/not_found.png';

export default class SearchResult {
  constructor() {
    this.container = $('#search-result');
    this.$videoList = $('#video-list', this.container);
    this.$tempFragment = document.createDocumentFragment();
    this.$scrollObserver = createElement('DIV', {
      id: 'search-result-scroll-observer',
    });
    this.$skeleton = Array.from({ length: YOUTUBE_SETTING.MAX_VIDEO_NUMBER }).map(() =>
      createElement('DIV', {
        className: 'skeleton',
        innerHTML: `
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      `,
      }),
    );
    this.bindEvents();
    YoutubeSearchStore.addSubscriber(this.render);
  }

  bindEvents() {
    onObserveElement(this.$scrollObserver, () => {
      const { isLoading } = YoutubeSearchStore.getState();
      if (isLoading) return;
      YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_LOADING_STATUS, true);
      YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT);
    });
    addEvent(this.container, {
      eventType: 'click',
      selector: '.video-item__save-button',
      handler: this.handleToggleSaveButton,
    });
  }

  handleToggleSaveButton = ({ target: $target }) => {
    const { videoId } = $target.closest('.video-item').dataset;
    if (YoutubeSaveStorage.has(videoId)) {
      YoutubeSaveStorage.remove(videoId);
      $target.textContent = '⬇ 저장';
      return;
    }

    const saveItemsCount = YoutubeSaveStorage.get().length;
    if (saveItemsCount === YOUTUBE_SETTING.MAX_SAVE_NUMBER) {
      alert(ERROR_MESSAGE.MAX_SAVE_VIDEO);
      return;
    }

    YoutubeSaveStorage.add(videoId);
    $target.textContent = '🗑 저장 취소';
  };

  render = ({ isLoading, isLoaded, items, error }) => {
    this.$videoList.innerHTML = '';

    if (error) {
      this.$videoList.append(this.getResultServerError());
      return;
    }

    if (items.length === 0 && isLoaded) {
      this.$videoList.append(this.getResultNotFound());
      return;
    }

    const $fragment = document.createDocumentFragment();
    if (items.length !== 0 && isLoaded) {
      $fragment.append(...this.getVideoList(items));
    }

    if (isLoading) {
      $fragment.append(...this.$skeleton);
    }

    $fragment.append(this.$scrollObserver);
    this.$videoList.append($fragment);
  };

  getResultNotFound() {
    return createElement('DIV', {
      className: 'no-result',
      innerHTML: `
        <img src="${notFoundImage}" alt="no result image" class="no-result__image">
        <p class="no-result__description">
          검색 결과가 없습니다<br />
          다른 키워드로 검색해보세요
        </p>
      `,
    });
  }

  getResultServerError() {
    return createElement('DIV', {
      className: 'no-result',
      innerHTML: `
        <img src="${notFoundImage}" alt="no result image" class="no-result__image">
        <p class="no-result__description">
          서버에서 오류가 발생하였습니다.<br />
          잠시 후 다시 시도해주세요.
        </p>
      `,
    });
  }

  getVideoList(items) {
    return items.map(video => {
      const buttonText = YoutubeSaveStorage.has(video.id.videoId) ? '🗑 저장 취소' : '⬇ 저장';
      return createElement('LI', {
        dataset: { 'video-id': video.id.videoId },
        className: 'video-item',
        innerHTML: `<img
          src="${video.snippet.thumbnails.medium.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${video.snippet.title}</h4>
        <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
        <p class="video-item__published-date">${getParsedTime(video.snippet.publishTime)}</p>
        <button class="video-item__save-button button">${buttonText}</button>`,
      });
    });
  }
}
