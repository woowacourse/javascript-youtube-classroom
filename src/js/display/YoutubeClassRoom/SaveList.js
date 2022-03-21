import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { addEventDelegate } from '@Utils/CustomEvent';
import { ACTION_TYPE, ALERT_MESSAGE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSaveListStore from '@Domain/YoutubeSaveListStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import Snackbar from '@Display/Element/Snackbar';

export default class SaveList {
  $container = $(SELECTOR.ID.SAVE_LIST_CONTENT);
  #renderMethodList = [];

  constructor() {
    this.setBindEvents();
    this.setRenderList();
    this.setSubscribeStores();
    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
  }

  render = state => {
    this.#renderMethodList.forEach(renderMethod => {
      renderMethod(state);
    });
  };

  addRenderMethod(renderMethod) {
    this.#renderMethodList.push(renderMethod);
  }

  setSubscribeStores() {
    YoutubeSaveListStore.addSubscriber(this.render);
  }

  setRenderList() {
    this.addRenderMethod(this.drawVideoList);
  }

  setBindEvents() {
    addEventDelegate(this.$container, SELECTOR.CLASS.SAVE_LIST_WATCHED_BUTTON, {
      eventType: 'click',
      handler: this.handleToggleWatched,
    });

    addEventDelegate(this.$container, SELECTOR.CLASS.SAVE_LIST_REMOVE_BUTTON, {
      eventType: 'click',
      handler: this.handleRemoveItem,
    });
  }

  handleToggleWatched = ({ target: $target }) => {
    const { videoId, state } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;
    const isUpdateState = state === 'unwatched';

    YoutubeSaveStorage.watched(videoId, isUpdateState);
    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
    Snackbar(ALERT_MESSAGE.SAVE_LIST_STATE_UPDATE);
  };

  handleRemoveItem = ({ target: $target }) => {
    if (!confirm(ALERT_MESSAGE.SAVE_LIST_CONFIRM_REMOVE)) {
      return;
    }
    const { videoId } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;

    YoutubeSaveStorage.remove(videoId);
    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
  };

  #getVideoElementList(items, listType) {
    return items.reduce(($previous, video) => {
      const watchedText = listType === 'watched' ? '추가' : '완료';

      const { id: videoId, content } = video;
      const $list = createElement('LI', {
        dataset: { 'video-id': videoId, state: listType },
        className: DOM_NAME.CLASS.VIDEO_ITEM,
        insertAdjacentHTML: [
          'afterbegin',
          ` <img src="${content.snippet.thumbnails.medium.url}"
              alt="${content.snippet.title} 썸네일" class="thumbnail">
            <h4 class="title">${content.snippet.title}</h4>
            <p class="channel-name">${content.snippet.channelTitle}</p>
            <p class="published-date">${getParsedTime(content.snippet.publishedAt)}</p>
            <div class="button-group">
              <button class="button save-item-watched-button ${listType}">${watchedText}</button>
              <button class="button save-item-remove-button">제거</button>
            </div>`,
        ],
      });

      $previous.append($list);
      return $previous;
    }, document.createDocumentFragment());
  }

  #getEmptyVideoList(listType) {
    const listText = listType === 'unwatched' ? '볼 영상' : '이미 본 영상';
    return createElement('DIV', {
      className: DOM_NAME.CLASS.EMPTY_CONTENT,
      insertAdjacentHTML: [
        'afterbegin',
        ` <i class="fa-solid fa-video-slash"></i>
          <p class="title">${listText}으로 저장된 동영상이 없어요!</p>
          <p class="description">화면 우측 상단의 검색 버튼을 눌러 동영상을 추가해주세요.</p>`,
      ],
    });
  }

  drawVideoList = ({ items, listType }) => {
    if (items.length === 0) {
      this.$container.replaceChildren(this.#getEmptyVideoList(listType));
      return;
    }

    const $videoList = this.#getVideoElementList(items, listType);
    this.$container.replaceChildren($videoList);
  };
}
