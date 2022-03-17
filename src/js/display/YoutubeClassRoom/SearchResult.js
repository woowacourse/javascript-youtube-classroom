import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { onObserveElement, addEventDelegate } from '@Utils/ElementControl';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import notFoundImage from '@Images/not_found.png';

export default class SearchResult {
  $container = $(SELECTOR.ID.SEARCH_RESULT_CONTAINER);
  drawList = [];

  constructor() {
    this.setDefaultElements();
    this.setBindEvents();
    this.setRenderList();
    this.setSubscribeStores();
  }

  render(state) {
    this.drawList.forEach(drawEvent => {
      drawEvent(state);
    });
  }

  setSubscribeStores() {
    YoutubeSearchStore.addSubscriber(this.render.bind(this));
  }

  addDrawList(drawEvent) {
    this.drawList.push(drawEvent);
  }

  setRenderList() {
    this.addDrawList(this.drawVideoList.bind(this));
    this.addDrawList(this.drawLoadingStatus.bind(this));
  }

  setDefaultElements() {
    this.$videoResult = $(SELECTOR.ID.VIDEO_RESULT, this.$container);
    this.$scrollObserver = $(SELECTOR.ID.SEARCH_RESULT_SCROLL_OBSERVER, this.$container);

    this.$skeletonList = $('#skeleton-list', this.$container);
    this.drawSkeletonList();
  }

  setBindEvents() {
    onObserveElement(this.$scrollObserver, () => {
      YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_LOADING_STATUS);
      YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_RESULT);
    });

    addEventDelegate(this.$container, SELECTOR.CLASS.VIDEO_ITEM_SAVE_BUTTON, {
      eventType: 'click',
      handler: this.handleToggleSaveButton,
    });
  }

  handleToggleSaveButton = ({ target: $target }) => {
    const { videoId } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;
    if (YoutubeSaveStorage.has(videoId)) {
      YoutubeSaveStorage.remove(videoId);
      $target.textContent = '⬇ 저장';
      return;
    }

    const saveItemsCount = YoutubeSaveStorage.get().length;
    if (saveItemsCount >= CLASS_ROOM_SETTING.MAX_SAVE_NUMBER) {
      alert(ERROR_MESSAGE.MAX_SAVE_VIDEO);
      return;
    }

    YoutubeSaveStorage.add(videoId);
    $target.textContent = '🗑 저장 취소';
  };

  drawSkeletonList() {
    const $fragment = document.createDocumentFragment();
    Array.from({ length: CLASS_ROOM_SETTING.MAX_VIDEO_NUMBER }).map(() => {
      const $skeleton = createElement('LI', {
        className: DOM_NAME.CLASS.VIDEO_LIST_SKELETON,
        insertAdjacentHTML: [
          'afterbegin',
          ` <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>`,
        ],
      });

      $fragment.append($skeleton);
    });
    this.$skeletonList.replaceChildren($fragment);
  }

  #getResultNotFound() {
    return createElement('DIV', {
      className: DOM_NAME.CLASS.SEARCH_RESULT_NOT_FOUND,
      insertAdjacentHTML: [
        'afterbegin',
        ` <img src="${notFoundImage}" alt="no result image" class="image">
          <p class="description">
            검색 결과가 없습니다<br />
            다른 키워드로 검색해보세요
          </p>`,
      ],
    });
  }

  #getResultServerError() {
    return createElement('DIV', {
      className: DOM_NAME.CLASS.SEARCH_RESULT_NOT_FOUND,
      src: notFoundImage,
      insertAdjacentHTML: [
        'afterbegin',
        ` <img src="${notFoundImage}" alt="no result image" class="image">
          <p class="description">
            서버에서 오류가 발생하였습니다.<br />
            잠시 후 다시 시도해주세요.
          </p>`,
      ],
    });
  }

  #getVideoElementList(items) {
    return items.reduce(($previous, video) => {
      const buttonText = YoutubeSaveStorage.has(video.id.videoId) ? '🗑 저장 취소' : '⬇ 저장';
      const $list = createElement('LI', {
        dataset: { 'video-id': video.id.videoId },
        className: DOM_NAME.CLASS.VIDEO_ITEM,
        insertAdjacentHTML: [
          'afterbegin',
          ` <img src="${video.snippet.thumbnails.medium.url}"
              alt="${video.snippet.title} 썸네일" class="thumbnail">
            <h4 class="title">${video.snippet.title}</h4>
            <p class="channel-name">${video.snippet.channelTitle}</p>
            <p class="published-date">${getParsedTime(video.snippet.publishTime)}</p>
            <button class="save-button button">${buttonText}</button>`,
        ],
      });

      $previous.append($list);
      return $previous;
    }, document.createDocumentFragment());
  }

  drawVideoList({ items, isLoaded, error }) {
    if (error) {
      this.$videoResult.replaceChildren(this.#getResultServerError());
      return;
    }

    if (items.length === 0 && isLoaded === true) {
      this.$videoResult.replaceChildren(this.#getResultNotFound());
      return;
    }

    if (items.length === 0 && isLoaded === false) {
      this.$videoResult.replaceChildren('');
      this.$videoResult.closest(SELECTOR.ID.VIDEO_LIST).scrollTo({ top: 0 });
      return;
    }

    const $videoList = this.#getVideoElementList(items);
    this.$videoResult.replaceChildren($videoList);
  }

  drawLoadingStatus({ searchKeyword, isLoading }) {
    this.$scrollObserver.classList.toggle('enable', !!searchKeyword);
    this.$container.classList.toggle('loading', isLoading);
  }
}
