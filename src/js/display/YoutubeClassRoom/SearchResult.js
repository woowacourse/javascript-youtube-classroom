import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { onObserveElement } from '@Utils/ElementControl';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import notFoundImage from '@Images/not_found.png';

export default class SearchResult extends Display {
  setContainer() {
    this.container = $('#search-result');
  }

  defaultElement() {
    this.$videoList = $('#video-list', this.container);
    this.$tempFragment = document.createDocumentFragment();
    this.$scrollObserver = createElement('DIV', {
      id: 'search-result-scroll-observer',
    });
    this.$skeleton = Array.from({ length: CLASS_ROOM_SETTING.MAX_VIDEO_NUMBER }).map(() =>
      createElement('DIV', {
        className: 'skeleton',
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
      YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_RESULT);
    });
    this.addEvent('click', '.video-item__save-button', this.handleToggleSaveButton.bind(this));
  }

  subscribeStores() {
    YoutubeSearchStore.addSubscriber(this.render.bind(this));
  }

  handleToggleSaveButton({ target: $target }) {
    const { videoId } = $target.closest('.video-item').dataset;
    if (YoutubeSaveStorage.has(videoId)) {
      YoutubeSaveStorage.remove(videoId);
      $target.textContent = '⬇ 저장';
      return;
    }

    const saveItemsCount = YoutubeSaveStorage.get().length;
    if (saveItemsCount === CLASS_ROOM_SETTING.MAX_SAVE_NUMBER) {
      alert(ERROR_MESSAGE.MAX_SAVE_VIDEO);
      return;
    }

    YoutubeSaveStorage.add(videoId);
    $target.textContent = '🗑 저장 취소';
  }

  render({ isLoading, isLoaded, items, error }) {
    this.$videoList.innerHTML = '';

    if (error === true) {
      this.$videoList.append(this.drawResultServerError());
      return;
    }

    const $fragment = document.createDocumentFragment();
    if (isLoading === true) {
      $fragment.append(...this.$skeleton);
    }

    if (items.length !== 0 && isLoaded === true) {
      $fragment.append(...this.drawVideoList(items));
      $fragment.append(this.$scrollObserver);
    }

    if (items.length === 0 && isLoaded === true) {
      $fragment.append(this.drawResultNotFound());
    }

    this.$videoList.append($fragment);
  }

  drawResultNotFound() {
    return createElement('DIV', {
      className: 'no-result',
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

  drawResultServerError() {
    return createElement('DIV', {
      className: 'no-result',
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

  drawVideoList(items) {
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
