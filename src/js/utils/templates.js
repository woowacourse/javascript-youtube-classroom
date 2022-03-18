import { changeDateFormat } from "./common.js";
import noImage from "../../assets/images/not_found.png";

export const getEmptyResultTemplate = `
  <img src=${noImage} class="modal-result__empty-image" alt="empty-image" />
  <p class="modal-result__empty-text">검색 결과가 없습니다<br/>다른 키워드로 검색해보세요</p>
`;

export const getThumnailTemplate = (video) => {
  return `
    <li class="video-item">
      <img src=${video.snippet.thumbnails.medium.url} class="video-item__thumbnail" alt="video-thumbnail">
      <h4 class="video-item__title">${video.snippet.title}</h4>
      <p class="video-item__channel-name">${video.snippet.channelTitle}</p>
      <p class="video-item__published-date">${changeDateFormat(video.snippet.publishedAt)}</p>
      <button data-id="${video.id.videoId}" data-title="${video.snippet.title}"  
      data-channel-title="${video.snippet.channelTitle}" data-date="${changeDateFormat(
    video.snippet.publishedAt,
  )}" type="button" class="video-item__save-button button">⬇ 저장</button>
    </li>
  `;
};

export const getFrameTemplate = (video) => {
  return `
    <li class="video-item">
      <iframe
      type="text/html"
      src="https://www.youtube.com/embed/${video.id}"
      frameborder="0"
      allowfullscreen="allowfullscreen"
      ></iframe>
      <h4 class="video-item__title">${video.title}</h4>
      <p class="video-item__channel-name">${video.channelTitle}</p>
      <p class="video-item__published-date">${video.date}</p> 
    </li>
  `;
};

export const getSkeletonTemplate = `
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
