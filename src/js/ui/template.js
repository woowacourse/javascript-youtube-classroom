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
  const saveDatas = store.getLocalStorage(STORAGE_KEY.VIDEO) ?? [];
  const resultTemplate = items
    .map(item => {
      const { publishedAt, channelId, title, thumbnails, channelTitle } =
        item.snippet;
      return `
        <li class="video-item"
          data-video-id=${item.id.videoId}
          data-publish-date=${publishedAt}
          data-channel-id=${channelId}
          data-title="${title}"
          data-thumbnail-url=${thumbnails.high.url}
          data-channel-title="${channelTitle}"
        >
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
          <a href="https://www.youtube.com/channel/${channelId}" data-channel-id=${channelId} target="_blank">
            <p class="video-item__channel-name">${channelTitle}</p>
          </a>
          <p class="video-item__published-date" data-publish-date=${publishedAt}>
            ${convertToKoreaLocaleDate(publishedAt)}
          </p>
          <button
            type="button"
            class="video-item__save-button button"
            onclick="saveVideo(event);"
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

const getVideoTemplate = (video, watched) => {
  const { videoId, publishedAt, channelId, title, thumbnailURL, channelTitle } =
    video;
  return `
    <li class="save-video-item">
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
      <button
        type="button"
        data-video-id=${videoId}
        onclick="deleteVideo(event);"
        class="save-video-item__button button"
        title="삭제"
      >🗑️</button>
      <button
        type="button"
        data-video-id=${videoId}
        onclick="reverseWatchVideo(event);"
        class="save-video-item__button button ${watched ? 'clicked' : ''}"
        title="체크"
      >✅</button>
    </li>
  `;
};

const getAllVideoTemplate = (videos, watched) => {
  const template = videos
    .map(video => getVideoTemplate(video, watched))
    .join('');
  return template;
};

const getRecentSearchButtonTemplate = recentSearch => {
  const template = recentSearch
    .map(
      text => `
      <button type="button" class="recent-search__button button">
        ${text}
      </button>
    `,
    )
    .join('');
  return template;
};

export {
  skeletonTemplate,
  getFoundResultTemplate,
  notFoundTemplate,
  getAllVideoTemplate,
  getVideoTemplate,
  getRecentSearchButtonTemplate,
};
