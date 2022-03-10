import { changeDateFormat } from './common.js';

export const noSearchResultTemplate = (imgSrcAddress) => {
  return `<div class="no-result">
    <img src=${imgSrcAddress} class = 'no-result__image' alt="없음" />
    <p class="no-result__description">
            검색 결과가 없습니다<br/>
            다른 키워드로 검색해보세요
          </p></div>`;
};

export const makeIframeTemplate = (video) => {
  return `
    <li class='video-item-container'>
      <iframe
          class = "video-item"
          type="text/html"
          src="https://www.youtube.com/embed/${video.id.videoId}"
          frameborder="0"
          allowfullscreen="allowfullscreen"
      ></iframe>
      <h4 class="video-item__title">${video.snippet.title}</h4>
      <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
      <p class="video-item__published-date">${changeDateFormat(video.snippet.publishedAt)}</p>
      <button id="${video.id.videoId}" class="video-item__save-button button">⬇ 저장</button>
  </li>`;
};

export const makeSkeletonTemplate = () => {
  return `
    <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
    </div>
    `;
};
