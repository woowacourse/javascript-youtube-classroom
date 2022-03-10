import { MESSAGE, STORAGE_KEY } from '../constants';
import { $, $$, showExceptionSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';
import { store } from '../domain/store';
import { API_KEY } from '../domain/key';
import { request } from '../domain/youtubeApi';

export default class Result {
  constructor() {}

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

  renderSkeletonUI() {
    const $videoList = $('.video-list');
    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      this.skeletonTemplate().repeat(10),
    );
  }

  foundResultTemplate(items) {
    const saveDatas = store.getLocalStorage(STORAGE_KEY) ?? [];
    const resultTemplate = items
      .map(item => {
        const { publishedAt, channelId, title, thumbnails, channelTitle } =
          item.snippet;
        return `
          <li class="video-item" data-video-id=${item.id.videoId}>
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
            ).toLocaleString('ko-KR')}
            </p>
            <button class="video-item__save-button button" ${
              saveDatas.includes(item.id.videoId) ? 'hidden' : ''
            }>⬇ 저장</button>
          </li>`;
      })
      .join('');
    return resultTemplate;
  }

  notFoundTemplate() {
    return `
      <div class="no-result">
        <img class="no-result__image"
          src=${NoResultImage}
          alt="no-result-image"
        >
        <div class="no-result__description">
          <p>${MESSAGE.NOT_FOUND}</p>
          <p>${MESSAGE.OTHER_KEYWORD}</p>
        </div>
      </div>
    `;
  }

  renderInitialVideoList(json) {
    const $videoList = $('.video-list');
    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      json.items.length
        ? this.foundResultTemplate(json.items)
        : this.notFoundTemplate(),
    );
    this.addSaveButtonClickEvent(json.items.length);
    if (json && json.nextPageToken) {
      this.scrollObserver(json.nextPageToken);
    }
  }

  renderNextVideoList(nextPageToken) {
    try {
      request($('#search-input-keyword').value, API_KEY, nextPageToken).then(
        json => {
          $('.video-list').insertAdjacentHTML(
            'beforeend',
            this.foundResultTemplate(json.items),
          );
          this.addSaveButtonClickEvent(json.items.length);
          if (json && json.nextPageToken) {
            this.scrollObserver(json.nextPageToken);
          }
        },
      );
    } catch ({ message }) {
      console.log(message);
    }
  }

  addSaveButtonClickEvent(length) {
    const saveButtons = $$('.video-item__save-button');
    [...saveButtons].slice(-length).forEach(saveButton => {
      saveButton.addEventListener('click', this.handleSaveVideo);
    });
  }

  handleSaveVideo(e) {
    const videoId = e.target.closest('li').dataset.videoId;
    try {
      store.setLocalStorage(STORAGE_KEY, videoId);
      showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
      e.target.setAttribute('hidden', true);
    } catch ({ message }) {
      showExceptionSnackBar(message);
    }
  }

  scrollObserver(nextPageToken) {
    let $li = $('li:last-child');

    const io = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          io.unobserve($li);
          this.renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: 0.5,
      },
    );

    io.observe($li);
  }
}
