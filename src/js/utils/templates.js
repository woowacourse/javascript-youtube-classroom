import { changeDateFormat } from "./common.js";
import emptyResult from "../../assets/images/not_found.png";
import emptyClassroom from "../../assets/images/empty.png";

export const getEmptyResultTemplate = `
  <img src=${emptyResult} class="modal-result__empty-image" alt="empty-result" />
  <p class="modal-result__empty-text">검색 결과가 없습니다<br/>다른 키워드로 검색해보세요</p>
`;

export const getEmptyClassroomTemplate = `
  <img src=${emptyClassroom} class="classroom__empty-image" alt="empty-classroom" />
  <p class="classroom__empty-text">저장된 동영상이 없습니다.</p>
`;

const getVideoInfoTemplate = (url, title, channelTitle, date) => {
  return `
      <img src=${url} class="video-item__thumbnail" alt="video-thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${date}</p>
  `;
};

export const getSearchVideoTemplate = (video) => {
  const id = video.id.videoId;
  const { url } = video.snippet.thumbnails.medium;
  const { title } = video.snippet;
  const { channelTitle } = video.snippet;
  const date = changeDateFormat(video.snippet.publishedAt);

  return `
    <li class="video-item">
      ${getVideoInfoTemplate(url, title, channelTitle, date)}
      <button data-id=${id} data-title=${title}  
        data-channel-title=${channelTitle} data-date=${date} data-url=${url} type="button"
        class="video-item__save-button button">⬇ 저장</button>
    </li>
  `;
};

export const getClassroomVideoTemplate = (video) => {
  const { id, url, title, channelTitle, date, watched } = video;

  return `
    <li class="video-item">
      ${getVideoInfoTemplate(url, title, channelTitle, date)}
      <div class="video-item__option" data-id=${id}>
        ${watched ? "" : `<button type="button" class="video-item__start-button">📺</button>`}
        <button type="button" class="video-item__watched-button ${watched ? "active" : ""}">✅</button>
        <button type="button" class="video-item__delete-button">🗑️</button>
      </div>
    </li>
  `;
};

export const getIframeTemplate = (id) => {
  return `
    <iframe
    class="video-item__iframe"
    type="text/html"
    src="https://www.youtube.com/embed/${id}"
    frameborder="0"
    allowfullscreen="allowfullscreen"
    ></iframe>`;
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
