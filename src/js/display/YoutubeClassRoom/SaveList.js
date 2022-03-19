import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { addEventDelegate } from '@Utils/CustomEvent';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSaveListStore from '@Domain/YoutubeSaveListStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import Snackbar from '@Display/Element/Snackbar';

export default class SaveList {
  $container = $('#save-video-result');
  #drawList = [];

  constructor() {
    this.setDefaultElements();
    this.setBindEvents();
    this.setRenderList();
    this.setSubscribeStores();
    YoutubeSaveListStore.dispatch('UPDATE_LIST');
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
    YoutubeSaveListStore.addSubscriber(this.render.bind(this));
  }

  setRenderList() {
    this.addDrawList(this.drawVideoList.bind(this));
  }

  setDefaultElements() {
    this.$videoResult = $('#save-video-result');
  }

  setBindEvents() {
    addEventDelegate(this.$container, '.save-item-watched-button', {
      eventType: 'click',
      handler: this.handleToggleWatched,
    });

    addEventDelegate(this.$container, '.save-item-remove-button', {
      eventType: 'click',
      handler: this.handleRemoveItem,
    });
  }

  handleToggleWatched = ({ target: $target }) => {
    const { videoId, state } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;
    const isUpdateState = state === 'unwatched';

    YoutubeSaveStorage.watched(videoId, isUpdateState);
    YoutubeSaveListStore.dispatch('UPDATE_LIST');
    new Snackbar('영상의 상태를 변경하였습니다.');
  };

  handleRemoveItem = ({ target: $target }) => {
    if (!confirm('정말 해당 영상을 제거하시겠습니까?')) {
      return;
    }
    const { videoId } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;

    YoutubeSaveStorage.remove(videoId);
    YoutubeSaveListStore.dispatch('UPDATE_LIST');
  };

  #getVideoElementList(items, listType) {
    return items.reduce(($previous, video, index) => {
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
      className: 'empty-content',
      insertAdjacentHTML: [
        'afterbegin',
        ` <i class="fa-solid fa-video-slash"></i>
          <p class="title">${listText}으로 저장된 동영상이 없어요!</p>
          <p class="description">화면 우측 상단의 검색 버튼을 눌러 동영상을 추가해주세요.</p>`,
      ],
    });
  }

  drawVideoList({ items, listType }) {
    if (items.length === 0) {
      this.$videoResult.replaceChildren(this.#getEmptyVideoList(listType));
      return;
    }

    const $videoList = this.#getVideoElementList(items, listType);
    this.$videoResult.replaceChildren($videoList);
  }
}
