import { $, createElement } from '@Utils/Dom';
import { getParsedTime } from '@Utils/ManageData';
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
    const scrollObserver = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          YoutubeSearchStore.dispatch('UPDATE_SEARCH_RESULT');
        }
      },
      {
        threshold: 1.0,
      },
    );
    scrollObserver.observe(this.$observer);

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

    YoutubeSaveStorage.add(videoId);
    $target.textContent = '🗑 저장 취소';
  }

  render({ isLoading, isLoaded, items }) {
    const $fragment = document.createDocumentFragment();

    this.$videoList.innerHTML = '';
    if (isLoading === true) {
      $fragment.append(...this.$skeleton);
    }

    if (items.length !== 0 && isLoaded === true) {
      $fragment.append(...this.drawVideoList(items));
      $fragment.append(this.$observer);
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
