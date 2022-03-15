import { changeDateFormat } from "./common.js";
import noImage from "../../assets/images/not_found.png";

export const noSearchResultTemplate = `
  <img src=${noImage} class="no-result__image" alt="검색결과 없음" />
  <p class="no-result__description">검색 결과가 없습니다<br/>다른 키워드로 검색해보세요</p>
`;

export const makeIframeTemplate = (video) => {
  return `
    <li class='video-item-container'>
      <img src=${video.snippet.thumbnails.medium.url} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${video.snippet.title}</h4>
      <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
      <p class="video-item__published-date">${changeDateFormat(video.snippet.publishedAt)}</p>
      <button id="${video.id.videoId}" type="button" class="video-item__save-button button">⬇ 저장</button>
  </li>`;
};

export const makeSkeletonTemplate = `
  <div class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line half"></p>
    <p class="line half"></p>
    <div class="button-container">
      <p class="button"></p>
    </div>
  </div>
`;
