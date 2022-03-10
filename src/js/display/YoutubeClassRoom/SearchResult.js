import { $, $$, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
import Display from '@Core/Display';
import SearchStore from '@Domain/YoutubeSearchResult';

export default class SearchResult extends Display {
  setContainer() {
    this.container = $('#search-result');
  }

  defaultElement() {
    this.$videoList = $('#video-list', this.container);
    this.$tempFragment = document.createDocumentFragment();
    this.$observer = createElement('DIV', {
      id: 'search-result-scroll-observer',
    });
    this.$skeleton = Array.from({ length: 10 }).map(() =>
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
    const options = {
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(entry => {
      if (entry[0].isIntersecting) {
        SearchStore.dispatch('UPDATE_SEARCH_RESULT');
      }
    }, options);

    observer.observe(this.$observer);
  }

  subscribeStores() {
    SearchStore.addSubscriber(this.render.bind(this));
  }

  render({ isLoading, isLoaded, items }) {
    const $fragment = document.createDocumentFragment();
    const latestItems = items.splice(-10);

    if (isLoading === true) {
      $fragment.append(...this.$skeleton);
    }

    if (isLoaded === true) {
      $$('.skeleton', this.container).forEach($child => $child.remove());
      $fragment.append(...this.drawVideoList(latestItems));
      $fragment.append(this.$observer);
    }

    this.$videoList.append($fragment);
  }

  drawVideoList(items) {
    return items.map(video =>
      createElement('LI', {
        dataset: { 'video-id': video.id.videoId },
        className: 'video-item',
        innerHTML: `<img
          src="${video.snippet.thumbnails.medium.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${video.snippet.title}</h4>
        <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
        <p class="video-item__published-date">${getParsedTime(video.snippet.publishTime)}</p>
        <button class="video-item__save-button button">⬇ 저장</button>`,
      }),
    );
  }
}
