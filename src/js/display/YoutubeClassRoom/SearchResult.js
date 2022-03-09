import { $ } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import Display from '@Core/Display';
import SearchStore from '@Domain/YoutubeSearchResult';

export default class SearchResult extends Display {
  setContainer() {
    this.container = $('#search-result');
  }

  defaultElement() {
    this.$videoList = $('#video-list', this.container);
  }

  bindEvents() {}

  subscribeStores() {
    SearchStore.addSubscriber(this.render.bind(this));
  }

  render({ isLoading, items }) {
    items.length > 0 && this.drawVideoList(items);
    isLoading === true && this.drawLoadingEffect();
  }

  drawLoadingEffect() {
    this.$videoList.innerHTML = Array.from({ length: 10 })
      .map(
        () => `
          <div class="skeleton">
            <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>
          </div>`,
      )
      .join('');
  }

  drawVideoList(items) {
    this.$videoList.innerHTML = items
      .map(
        video => `<li class="video-item" data-video-id="${video.id.videoId}">
        <img
          src="${video.snippet.thumbnails.medium.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${video.snippet.title}</h4>
        <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
        <p class="video-item__published-date">${getParsedTime(video.snippet.publishTime)}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>`,
      )
      .join('');
  }
}
