import { ERROR_MESSAGE } from '../constants';
import { API_KEY } from '../domain/key';
import { request } from '../domain/youtubeApi';
import { $, showExceptionSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';

export default class Search {
  constructor() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if ($('#search-input-keyword').value === '') {
        showExceptionSnackBar(ERROR_MESSAGE.BLANK_SEARCH_INPUT);
        return;
      }

      const $videoList = $('.video-list');
      $videoList.replaceChildren();
      $videoList.insertAdjacentHTML(
        'beforeend',
        this.skeletonTemplate().repeat(8),
      );

      try {
        request($('#search-input-keyword').value, API_KEY).then(json => {
          this.renderVideoList(json);
        });
      } catch ({ message }) {
        console.log(message);
      }
    });
  }

  skeletonTemplate() {
    return `
      <div class="skeleton">
        <div class="skeleton__image"></div>
        <p class="skeleton__line"></p>
        <p class="skeleton__line"></p>
        <p class="skeleton__line"></p>
      </div>
    `;
  }

  searchResultTemplate(items) {
    const resultTemplate = items
      .map(item => {
        const { publishedAt, channelId, title, thumbnails, channelTitle } =
          item.snippet;
        return `<li class="video-item" data-video-id=${item.id.videoId}>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                  <img
                    src=${thumbnails.high.url}
                    alt="video-item-thumbnail" class="video-item__thumbnail">
                </a>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                  <h4 class="video-item__title">${title}</h4>
                </a>
                <a href="https://www.youtube.com/channel/${channelId}"><p class="video-item__channel-name">${channelTitle}</p></a>
                <p class="video-item__published-date">${new Date(
                  publishedAt,
                ).toLocaleString('ko-KR')}</p>
                <button class="video-item__save-button button">⬇ 저장</button>
              </li>`;
      })
      .join('');

    const nonResultTemplate = `
      <div class="no-result">
        <img class="no-result__image"
          src=${NoResultImage}
          alt="no-result-image"
        >
        <div class="no-result__description">
          <p>검색 결과가 없습니다</p>
          <p>다른 키워드로 검색해보세요</p>
        </div>
      </div>
    `;

    return items.length ? resultTemplate : nonResultTemplate;
  }

  renderVideoList(json) {
    const $videoList = $('.video-list');
    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      this.searchResultTemplate(json.items),
    );
  }
}
