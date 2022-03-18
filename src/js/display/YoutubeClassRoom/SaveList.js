import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import { onObserveElement, addEventDelegate } from '@Utils/ElementControl';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { SELECTOR, DOM_NAME } from '@Constants/Selector';
import YoutubeSaveListStore from '@Domain/YoutubeSaveListStore';

export default class SaveList {
  $container = $(SELECTOR.ID.SEARCH_RESULT_CONTAINER);
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

  setBindEvents() {}

  #getVideoElementList(items) {
    return items.reduce(($previous, video, index) => {
      const { id: videoId, content } = video;
      const $list = createElement('LI', {
        dataset: { 'video-id': videoId, 'primary-key': index },
        className: DOM_NAME.CLASS.VIDEO_ITEM,
        insertAdjacentHTML: [
          'afterbegin',
          ` <img src="${content.snippet.thumbnails.medium.url}"
              alt="${content.snippet.title} 썸네일" class="thumbnail">
            <h4 class="title">${content.snippet.title}</h4>
            <p class="channel-name">${content.snippet.channelTitle}</p>
            <p class="published-date">${getParsedTime(content.snippet.publishedAt)}</p>`,
        ],
      });

      $previous.append($list);
      return $previous;
    }, document.createDocumentFragment());
  }

  drawVideoList({ items }) {
    const $videoList = this.#getVideoElementList(items);
    this.$videoResult.replaceChildren($videoList);
  }

  drawLoadingStatus({ searchKeyword, isLoading }) {
    this.$scrollObserver.classList.toggle('enable', !!searchKeyword);
    this.$container.classList.toggle('loading', isLoading);
  }
}
