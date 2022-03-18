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
  videoItem({ id, channel, thumbnail, title, date }, videoIdArray) {
    return `<li class="video-item" data-video-id="${id}">
    <img
    src="${thumbnail}"
    alt="video-item-thumbnail"
    class="video-item__thumbnail"
    />
    <h4 class="video-item__title">
      ${title}
    </h4>
    <p class="video-item__channel-name ">${channel}</p>
    <p class="video-item__published-date ">${date}</p>
    <button class="video-item__save-button button ${
      videoIdArray.includes(String(id)) ? "hide" : ""
    } ">
      ⬇ 저장
    </button>
  </li>`;
  },
  videoItems(responseData, videoIdArray) {
    return responseData
      .map((item) =>
        this.videoItem(
          {
            id: item.id.videoId,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            date: parsedDate(item.snippet.publishTime),
          },
          videoIdArray
        )
      )
      .join("");
  },
  savedVideoItem({ id, channel, thumbnail, title, date, isWatched }) {
    return `<li class="video-item" data-video-id="${id}">
    <img
      src="${thumbnail}"
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
  savedVideoItems(videoStorage, watchedVideoOnly) {
    if (watchedVideoOnly) {
      return videoStorage
        .map((item) => {
          return item.isWatched
            ? this.savedVideoItem({
                id: item.videoId,
                channel: item.channel,
                thumbnail: item.thumbnail,
                title: item.title,
                date: item.publishTime,
                isWatched: item.isWatched,
              })
            : "";
        })
        .join("");
    }

    return videoStorage
      .map((item) => {
        return item.isWatched
          ? ""
          : this.savedVideoItem({
              id: item.videoId,
              channel: item.channel,
              thumbnail: item.thumbnail,
              title: item.title,
              date: item.publishTime,
              isWatched: item.isWatched,
            });
      })
      .join("");
  },
};

export default generateTemplate;
