import notFountImage from "../../assets/images/not_found.png";

export default class VideoStorageView {
  constructor() {
    this.savedVideoSection = document.querySelector(".saved-video__section");
    this.savedVideoList = document.querySelector(".saved-video-list");
    this.noResultDiv = document.querySelector(
      ".saved-video__section .no-result"
    );
  }

  savedVideoItem = ({ id, channel, thumbnail, title, date, isWatched }) => {
    return `<li class="video-item" data-video-id="${id}">
    <a href="https://www.youtube.com/watch?v=${id}" target="_blank">
      <img
        src="${thumbnail}"
        alt="video-item-thumbnail"
        class="video-item__thumbnail"
      />
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channel}</p>
      <p class="video-item__published-date">${date}</p>
    </a>
    <div class="video-button__wrapper">
      <button class="video-item__watched-button button ${
        isWatched ? "selected" : ""
      }">✅</button>
      <button class="video-item__delete-button button">🗑️</button>
    </div>
  </li>`;
  };

  #savedVideoItems = (videoStorage, watchedVideoOnly) => {
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
  };

  renderEmptyStorage = () => {
    this.savedVideoList.classList.add("hide");
    this.noResultDiv.classList.remove("hide");
    document.querySelector(".no-result__image").src = notFountImage;
  };

  renderSavedVideo = (videoData, watchedVideoOnly) => {
    const videoItemTemplate = this.#savedVideoItems(
      videoData,
      watchedVideoOnly
    );

    document
      .querySelectorAll(".saved-video-list .video-item")
      .forEach((element) => element.remove());

    this.savedVideoList.classList.remove("hide");
    this.savedVideoList.insertAdjacentHTML("beforeend", videoItemTemplate);

    if (!this.noResultDiv) {
      return;
    }

    this.noResultDiv.classList.add("hide");
  };

  renderNavButtonStateChanged = (watchedVideoOnly) => {
    if (watchedVideoOnly) {
      document
        .querySelector("#watch-later-video-button")
        .classList.remove("selected");
      document.querySelector("#watched-video-button").classList.add("selected");
      return;
    }

    document
      .querySelector("#watch-later-video-button")
      .classList.add("selected");
    document
      .querySelector("#watched-video-button")
      .classList.remove("selected");
  };
}
