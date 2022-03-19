import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { addEventDelegate } from '@Utils/ElementControl';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSaveListStore from '@Domain/YoutubeSaveListStore';
import YoutubeSaveStorage from '../../domain/YoutubeSaveStorage';

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
  };

  handleRemoveItem = ({ target: $target }) => {
    const { videoId } = $target.closest(SELECTOR.CLASS.VIDEO_ITEM).dataset;

    YoutubeSaveStorage.remove(videoId);
    YoutubeSaveListStore.dispatch('UPDATE_LIST');
  };

  #getVideoElementList(items, listType) {
    return items.reduce(($previous, video, index) => {
      const watchedText = listType === 'watched' ? '추가' : '완료';

      const { id: videoId, content } = video;
      const $list = createElement('LI', {
        dataset: { 'video-id': videoId, 'primary-key': index, state: listType },
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

  drawVideoList({ items, listType }) {
    const $videoList = this.#getVideoElementList(items, listType);
    this.$videoResult.replaceChildren($videoList);
  }

  drawLoadingStatus({ searchKeyword, isLoading }) {
    this.$scrollObserver.classList.toggle('enable', !!searchKeyword);
    this.$container.classList.toggle('loading', isLoading);
  }
}
