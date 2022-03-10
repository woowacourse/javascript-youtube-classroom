import { parsedDate } from "./utils/utils";

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
  `.repeat(10);
  },
  noResult() {
    return `
    <div class="no-result">
      <img src="./src/assets/images/not_found.png" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
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
  videoItems(responseData, userStorage) {
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
          userStorage.getStorage()
        )
      )
      .join("");
  },
};

export default generateTemplate;
