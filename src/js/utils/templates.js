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
  return `
    <li class='video-item-container'>
      <img
        src="https://img.youtube.com/vi/${video.id}/0.jpg"
        alt="video-item-thumbnail" class="video-item">
      <h4 class="video-item__title">${video.title}</h4>
      <p class="video-item__channel-name">${video.channelName}</p>
      <p class="video-item__published-date">${video.publishedDate}</p>
      <div class = 'button-container'>
        <button id="${video.id}" class="already-watch-button button ${video.watchLater ? '' : 'hide'}">✅</button>
        <button id="${video.id}" class="discard-button button ${video.watchLater ? '' : 'hide'}">🗑️</button>
        <button id="${video.id}" class="video-item__save-button button 
          ${exist === 'exist' ? 'hide' : ''} ${video.watchLater ? 'hide' : ''}">⬇ 저장</button>
      </div>
  </li>`;
};

export const makeSkeletonTemplate = () => {
  return `
  <div class="skeleton">
    <div class="image"></div>
    <p class="line title"></p>
    <p class="line channel-name"></p>
    <p class="line pblsh-date"></p>
    <p class="skeleton-button"></p>
  </div>
    `;
};
