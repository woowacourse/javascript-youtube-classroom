import { $, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { onObserveElement } from '@Utils/elementController';
import { YOUTUBE_SETTING } from '@Constants/setting';
import { YOUTUBE_SEARCH_ACTION } from '@Constants/action';
import { ERROR_MESSAGE } from '@Constants/message';
import { SELECTOR, DOM_NAME } from '@Constants/selector';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import notFoundImage from '@Images/not_found.png';

export default class SearchResult extends Display {
  setContainer() {
    this.container = $(SELECTOR.ID.SEARCH_RESULT_CONTAINER);
  }

  setDefaultElement() {
    this.$videoList = $(SELECTOR.ID.VIDEO_LIST, this.container);
    this.$tempFragment = document.createDocumentFragment();
    this.$scrollObserver = createElement('DIV', {
      id: DOM_NAME.ID.SEARCH_RESULT_SCROLL_OBSERVER,
    });
    this.$skeleton = Array.from({ length: YOUTUBE_SETTING.MAX_VIDEO_NUMBER }).map(() =>
      createElement('DIV', {
        className: DOM_NAME.CLASS.VIDEO_LIST_SKELETON,
        innerHTML: `
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      `,
      }),
    );
  }

  bindEvents() {
    onObserveElement(this.$scrollObserver, () => {
      const { isLoading } = YoutubeSearchStore.getState();
      if (isLoading) return;
      YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_LOADING_STATUS, true);
      YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT);
    });
    this.addEvent({
      eventType: 'click',
      selector: SELECTOR.CLASS.VIDEO_ITEM_SAVE_BUTTON,
      handler: this.handleToggleSaveButton.bind(this),
    });
  }

  subscribeStores() {
    YoutubeSearchStore.addSubscriber(this.render.bind(this));
  }

  handleToggleSaveButton({ target: $target }) {
    const { videoId } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;
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
  }

  render({ isLoading, isLoaded, items, error }) {
    this.$videoList.innerHTML = '';

    if (error === true) {
      this.$videoList.append(this.getResultServerError());
      return;
    }

    if (items.length === 0 && isLoaded === true) {
      this.$videoList.append(this.getResultNotFound());
      return;
    }

    const $fragment = document.createDocumentFragment();
    if (items.length !== 0 && isLoaded === true) {
      $fragment.append(...this.getVideoList(items));
    }

    if (isLoading === true) {
      $fragment.append(...this.$skeleton);
    }

    $fragment.append(this.$scrollObserver);
    this.$videoList.append($fragment);
  }

  getResultNotFound() {
    return createElement('DIV', {
      className: DOM_NAME.CLASS.SEARCH_RESULT_NOT_FOUND,
      src: notFoundImage,
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
      className: DOM_NAME.CLASS.SEARCH_RESULT_NOT_FOUND,
      src: notFoundImage,
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
        className: DOM_NAME.CLASS.VIDEO_ITEM,
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
