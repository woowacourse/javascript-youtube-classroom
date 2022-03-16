import { parsedDate } from "./utils/utils";
import { ITEMS_PER_REQUEST } from "./constants/constants";

const generateTemplate = {
  skeleton() {
    return `
    <li class="video-item skeleton" data-video-id="">
      <div class="video-item__thumbnail image"></div>
      <div>
        <div class="video-item__title line"></div>
        <div class="video-item__channel-name line"></div>
        <div class="video-item__published-date line"></div>
      </div>
      <div class="video-item__save-button button"></div>
    </li>
  `.repeat(ITEMS_PER_REQUEST);
  },
  noResult(src, message) {
    return `
    <div class="no-result">
      <img src=${src} alt="no result image" class="no-result__image">
      <p class="no-result__description">
        ${message}
      </p>
    </div>
  `;
  },
  videoItem({ id, channel, defaultThumbnail, title, date }, storage) {
    return `<li class="video-item" data-video-id="${id}">
    <img
    src="${defaultThumbnail}"
    alt="video-item-thumbnail"
    class="video-item__thumbnail"
    />
    <h4 class="video-item__title">
      ${title}
    </h4>
    <p class="video-item__channel-name ">${channel}</p>
    <p class="video-item__published-date ">${date}</p>
    <button class="video-item__save-button button ${
      storage.includes(String(id)) ? "hide" : ""
    } ">
      ⬇ 저장
    </button>
  </li>`;
  },
  videoItems(responseData, videoStorage) {
    return responseData
      .map((item) =>
        this.videoItem(
          {
            id: item.id.videoId,
            channel: item.snippet.channelTitle,
            defaultThumbnail: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            date: parsedDate(item.snippet.publishTime),
          },
          videoStorage.getStorage()
        )
      )
      .join("");
  },
  savedVideoItem({ id, channel, defaultThumbnail, title, date, isWatched }) {
    return `<li class="video-item" data-video-id="${id}">
    <img
      src=${defaultThumbnail}"
      alt="video-item-thumbnail"
      class="video-item__thumbnail"
    />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channel}</p>
    <p class="video-item__published-date">${date}</p>
    <div class="video-button__wrapper">
      <button class="video-item__watched-button button ${
        isWatched ? "selected" : ""
      }">✅</button>
      <button class="video-item__delete-button button">🗑️</button>
    </div>
  </li>`;
  },
};

export default generateTemplate;
