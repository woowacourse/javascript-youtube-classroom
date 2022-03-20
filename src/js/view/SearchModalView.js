import { scrollToTop } from "../utils/dom";
import { parsedDate } from "../utils/utils";
import { ITEMS_PER_REQUEST } from "../constants/constants";
import notFountImage from "../../assets/images/not_found.png";

export default class SearchModalView {
  constructor() {
    this.modalContainer = document.querySelector(".modal-container");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");
  }

  openSearchModal() {
    this.modalContainer.classList.remove("hide");
  }

  closeSearchModal() {
    this.searchInputKeyword.value = "";
    scrollToTop(this.videoList);
    this.videoList.innerHTML = "";
    this.modalContainer.classList.add("hide");
  }

  clearVideoList() {
    scrollToTop(this.videoList);
    this.videoList.innerHTML = "";
  }

  renderSkeleton() {
    this.videoList.insertAdjacentHTML("beforeend", this.#skeleton());
  }

  unrenderSkeleton() {
    document.querySelectorAll(".skeleton").forEach((element) => {
      this.videoList.removeChild(element);
    });
  }

  renderNoResultPage() {
    const message = "검색 결과가 없습니다<br />다른 키워드로 검색해보세요";

    this.searchResult.removeChild(this.videoList);
    this.searchResult.classList.add("search-result--no-result");
    this.searchResult.insertAdjacentHTML(
      "beforeend",
      this.#noResult(notFountImage, message)
    );
  }

  renderSearchResult(responseData, videoIdArray) {
    this.unrenderSkeleton();
    const videoItemTemplate = this.#videoItems(
      responseData.items,
      videoIdArray
    );

    this.videoList.insertAdjacentHTML("beforeend", videoItemTemplate);
  }

  hideSaveButton(target) {
    target.classList.add("hide");
  }

  videoItem = ({ id, channel, thumbnail, title, date }, videoIdArray) => {
    return `<li class="video-item" data-video-id="${id}">
    <a href="https://www.youtube.com/watch?v=${id}" target="_blank">
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
    </a>
    <button class="video-item__save-button button ${
      videoIdArray.includes(String(id)) ? "hide" : ""
    } ">
      ⬇ 저장
    </button>
  </li>`;
  };

  #videoItems = (responseData, videoIdArray) => {
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
  };

  #skeleton = () => {
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
  };

  #noResult(src, message) {
    return `
    <div class="no-result">
      <img src=${src} alt="no result image" class="no-result__image">
      <p class="no-result__description">
        ${message}
      </p>
    </div>
  `;
  }
}
