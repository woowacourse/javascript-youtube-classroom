import { MAX_SAVE_COUNT, MESSAGE } from '../constants';
import { $, $$, showExceptionSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';
import { store } from '../domain/store';

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
      this.skeletonTemplate().repeat(8),
    );
  }

  foundResultTemplate(items) {
    const saveDatas = store.getLocalStorage() ?? [];
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

  renderVideoList(json) {
    const $videoList = $('.video-list');
    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      json.items.length
        ? this.foundResultTemplate(json.items)
        : this.notFoundTemplate(),
    );
    this.addSaveButtonClickEvent();
  }

  addSaveButtonClickEvent() {
    const saveButtons = $$('.video-item__save-button');
    saveButtons.forEach(saveButton => {
      saveButton.addEventListener('click', this.handleSaveVideo);
    });
  }

  handleSaveVideo(e) {
    const videoId = e.target.closest('li').dataset.videoId;
    const saveDatas = store.getLocalStorage() ?? [];
    if (saveDatas.length >= MAX_SAVE_COUNT) {
      showExceptionSnackBar(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
      return;
    }
    saveDatas.push(videoId);
    store.setLocalStorage(saveDatas);
    showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
    e.target.setAttribute('hidden', true);
  }
}
