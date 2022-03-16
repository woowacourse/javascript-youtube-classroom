import { store } from '../domain/store';
import { MESSAGE, STORAGE_KEY } from '../constants';
import { convertToKoreaLocaleDate, isSavedVideo } from '../utils/common';
import NoResultImage from '../../assets/images/not_found.png';

const skeletonTemplate = `
  <div class="skeleton">
    <div class="skeleton__image"></div>
    <p class="skeleton__line"></p>
    <p class="skeleton__line"></p>
    <p class="skeleton__line"></p>
  </div>
`;

const getFoundResultTemplate = items => {
  const saveDatas = store.getLocalStorage(STORAGE_KEY) ?? [];
  const resultTemplate = items
    .map(item => {
      const { publishedAt, channelId, title, thumbnails, channelTitle } =
        item.snippet;
      return `
        <li class="video-item">
          <a
            href="https://www.youtube.com/watch?v=${item.id.videoId}"
            target="_blank"
          >
            <img
              src=${thumbnails.high.url}
              alt="video-item-thumbnail" class="video-item__thumbnail">
          </a>
          <a href="https://www.youtube.com/watch?v=${item.id.videoId}"
            target="_blank"
          >
            <h4 class="video-item__title">${title}</h4>
          </a>
          <a href="https://www.youtube.com/channel/${channelId}" target="_blank">
            <p class="video-item__channel-name">${channelTitle}</p>
          </a>
          <p class="video-item__published-date">
            ${convertToKoreaLocaleDate(publishedAt)}
          </p>
          <button
            class="video-item__save-button button"
            onclick="saveVideo(event);"
            data-video-id=${item.id.videoId}
            ${isSavedVideo(saveDatas, item.id.videoId) ? 'hidden' : ''}
          >⬇ 저장</button>
        </li>
      `;
    })
    .join('');
  return resultTemplate;
};

const notFoundTemplate = `
  <div class="no-result">
    <img class="no-result__image"
      src=${NoResultImage}
      alt="no-result-image"
    >
    <div class="no-result__description">
      <p>${MESSAGE.NOT_FOUND}</p>
      <p>${MESSAGE.OTHER_KEYWORD}</p>
    </div>
  <div>
`;

const getVideoTemplate = videos => {
  const template = videos
    .map(video => {
      const {
        videoId,
        publishedAt,
        channelId,
        title,
        thumbnailURL,
        channelTitle,
      } = video;
      return `
        <li class="save-video-item" data-video-id=${videoId}>
          <a
            href="http://www.youtube.com/watch?v=${videoId}"
            target="_blank"
          >
            <img
              src=${thumbnailURL}
              alt="video-item-thumbnail" class="video-item__thumbnail">
          </a>
          <a
            href="https://www.youtube.com/watch?v=${videoId}"
            target="_blank"
          >
            <h4 class="video-item__title">${title}</h4>
          </a>
          <a href="https://www.youtube.com/channel/${channelId}" target="_blank">
            <p class="video-item__channel-name">${channelTitle}</p>
          </a>
          <p class="video-item__published-date">
            ${convertToKoreaLocaleDate(publishedAt)}
          </p>
          <button type="button" class="delete-button save-video-item__button button" title="삭제">🗑️</button>
          <button type="button" class="watch-button save-video-item__button button" title="체크">✅</button>
        </li>
      `;
    })
    .join('');
  return template;
};

export {
  skeletonTemplate,
  getFoundResultTemplate,
  notFoundTemplate,
  getVideoTemplate,
};
