import { changeDateFormat } from './common.js';
import noImage from '../../assets/images/not_found.png';

export const noSearchResultTemplate = () => {
  return `<div class="no-result">
    <img src=${noImage} class = 'no-result__image' alt="없음" />
    <p class="no-result__description">
            검색 결과가 없습니다<br/>
            다른 키워드로 검색해보세요
          </p></div>`;
};

export const makeThumbnailTemplate = (video, exist) => {
  let displayProp = '';
  if (exist === 'exist') {
    displayProp = 'hide';
  }

  return `
    <li class='video-item-container'>
      <img
        src="https://img.youtube.com/vi/${video.id.videoId}/0.jpg"
        alt="video-item-thumbnail" class="video-item">
      <h4 class="video-item__title">${video.snippet.title}</h4>
      <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
      <p class="video-item__published-date">${changeDateFormat(video.snippet.publishedAt)}</p>
      <button id="${video.id.videoId}"  class="video-item__save-button button ${displayProp}">⬇ 저장</button>
  </li>`;
};

export const makeSkeletonTemplate = () => {
  return `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
      <p class="line"></p>
      <p class="skeleton-button"></p>
    </div>
    `;
};
