import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { onObserveElement } from '@Utils/ElementControl';
import { addEventDelegate } from '@Utils/CustomEvent';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import YoutubeSaveListStore from '@Domain/YoutubeSaveListStore';
import Snackbar from '@Display/Element/Snackbar';

export default class SearchResult {
  $container = $(SELECTOR.ID.SEARCH_RESULT_CONTAINER);
  #drawList = [];

  constructor() {
    this.setDefaultElements();
    this.setBindEvents();
    this.setRenderList();
    this.setSubscribeStores();
  }

  render(state) {
    this.#drawList.forEach(drawEvent => {
      drawEvent(state);
    });
  }

  addDrawList(drawEvent) {
    this.#drawList.push(drawEvent);
  }

  setSubscribeStores() {
    YoutubeSearchStore.addSubscriber(this.render.bind(this));
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
    const { items: videoList } = YoutubeSearchStore.getState();
    const { videoId, primaryKey } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;

    if (YoutubeSaveStorage.has(videoId)) {
      YoutubeSaveStorage.remove(videoId);
      YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
      $target.textContent = '⬇ 저장';

      Snackbar('볼 영상 목록에서 제거되었습니다.');
      return;
    }

    const saveItemsCount = YoutubeSaveStorage.get().length;
    if (saveItemsCount >= CLASS_ROOM_SETTING.MAX_SAVE_NUMBER) {
      alert(ERROR_MESSAGE.MAX_SAVE_VIDEO);
      return;
    }

    YoutubeSaveStorage.add(videoId, videoList[primaryKey]);
    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
    $target.textContent = '🗑 저장 취소';

    Snackbar('볼 영상 목록에 저장되었습니다.');
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

  #getResultNotFound(searchKeyword) {
    return createElement('DIV', {
      className: 'empty-content',
      insertAdjacentHTML: [
        'afterbegin',
        ` <i class="fa-solid fa-face-rolling-eyes"></i>
          <p class="title">검색 결과가 없어요!</p>
          <p class="description">${searchKeyword} 키워드의 검색 결과가 없습니다. 다른 키워드로 검색해보아주세요!</p>`,
      ],
    });
  }

  #getResultServerError() {
    return createElement('DIV', {
      className: 'empty-content',
      insertAdjacentHTML: [
        'afterbegin',
        ` <i class="fa-solid fa-face-sad-tear"></i>
          <p class="title">엇! 서버 오류가 발생했어요!</p>
          <p class="description">네트워크 환경을 확인하시거나, 잠시 후 다시 시도해주세요.</p>`,
      ],
    });
  }

  #getVideoElementList(items) {
    return items.reduce(($previous, video, index) => {
      const buttonText = YoutubeSaveStorage.has(video.id.videoId) ? '🗑 저장 취소' : '⬇ 저장';
      const $list = createElement('LI', {
        dataset: { 'video-id': video.id.videoId, 'primary-key': index },
        className: DOM_NAME.CLASS.VIDEO_ITEM,
        insertAdjacentHTML: [
          'afterbegin',
          ` <img src="${video.snippet.thumbnails.medium.url}"
              alt="${video.snippet.title} 썸네일" class="thumbnail">
            <h4 class="title">${video.snippet.title}</h4>
            <p class="channel-name">${video.snippet.channelTitle}</p>
            <p class="published-date">${getParsedTime(video.snippet.publishedAt)}</p>
            <button class="save-button button">${buttonText}</button>`,
        ],
      });

      $previous.append($list);
      return $previous;
    }, document.createDocumentFragment());
  }

  drawVideoList({ items, searchKeyword, isLoaded, error }) {
    if (error) {
      this.$videoResult.replaceChildren(this.#getResultServerError());
      return;
    }

    if (items.length === 0 && isLoaded === true) {
      this.$videoResult.replaceChildren(this.#getResultNotFound(searchKeyword));
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
