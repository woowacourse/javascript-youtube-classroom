import { GET_VIDEO_UNIT, MESSAGE, STORAGE_KEY } from '../constants';
import { $, $$, showExceptionSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';
import { store } from '../domain/store';
import { request } from '../domain/youtubeApi';
import { convertToKoreaLocaleDate, delay } from '../utils/common';

export default class Result {
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
      this.skeletonTemplate().repeat(GET_VIDEO_UNIT),
    );
  }

  removeSkeletonUI() {
    $$('.skeleton').forEach(skeleton => $('.video-list').removeChild(skeleton));
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
            <p class="video-item__published-date">
              ${convertToKoreaLocaleDate(publishedAt)}
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
    request($('#search-input-keyword').value, nextPageToken)
      .then(json => {
        this.removeSkeletonUI();
        $('.video-list').insertAdjacentHTML(
          'beforeend',
          this.foundResultTemplate(json.items),
        );
        this.addSaveButtonClickEvent(json.items.length);
        if (json && json.nextPageToken) {
          this.scrollObserver(json.nextPageToken);
        }
      })
      .catch(async ({ message }) => {
        await delay(700);
        this.skeletonTemplate();
        showExceptionSnackBar(message);
      });
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

  resetVideoList() {
    $('.video-list').replaceChildren();
  }
}
