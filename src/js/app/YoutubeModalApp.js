import getSearchResult from "../api/getSearchResult";
import { DELAY_TIME, SNACK_BAR_MESSAGE } from "../constants";
import generateTemplate from "../view/templates";
import { throttle, validateInput } from "../utils";
import {
  getTotalScrollHeight,
  getCurrentScrollHeight,
  getTargetData,
  $,
  $$,
} from "../view/dom";

export default class YoutubeModalApp {
  #videoList = $(".video-list");
  #searchInputKeyword = $("#search-input-keyword");
  #nextPageToken = "";
  #keyword = "";
  #videoStorage;
  #view;

  constructor(view, videoStorage) {
    this.#view = view;
    this.#videoStorage = videoStorage;

    this.#videoList.addEventListener("click", this.#onClickSaveButton);
    this.#videoList.addEventListener(
      "scroll",
      throttle(this.#onScrollVideoList, DELAY_TIME)
    );
    $("#search-button").addEventListener("click", this.#onSubmitSearchButton);
  }

  #onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    try {
      this.#videoStorage.addVideo(getTargetData(target.closest(".video-item")));
    } catch ({ message }) {
      alert(message);
    }

    this.#view.renderSnackBar(SNACK_BAR_MESSAGE.VIDEO_SAVE);
    target.classList.add("hide");
  };

  #onSubmitSearchButton = (e) => {
    e.preventDefault();
    this.#view.hideNotFoundImage(this.#videoList);

    try {
      validateInput(this.#searchInputKeyword.value);
    } catch ({ message }) {
      alert(message);

      return;
    }

    this.#view.clearModalContainer(this.#videoList);

    this.#view.renderSkeleton({
      element: this.#videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    this.#searchKeyword(this.#searchInputKeyword.value);
  };

  #onScrollVideoList = async () => {
    if (
      getTotalScrollHeight(this.#videoList) >
        getCurrentScrollHeight(this.#videoList) ||
      !this.#nextPageToken
    ) {
      return;
    }

    this.#view.renderSkeleton({
      element: this.#videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    const responseData = await getSearchResult(
      this.#keyword,
      this.#nextPageToken
    );

    // 중복된 요청을 보냈을 경우
    if (this.#nextPageToken === responseData.nextPageToken) {
      this.#view.removeChildElements(this.#videoList, $$(".skeleton"));

      return;
    }

    this.#nextPageToken = responseData.nextPageToken;

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.#videoStorage.getVideo()
    );

    this.#view.renderSearchResult({
      element: this.#videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  };

  async #searchKeyword(keyword) {
    this.#keyword = keyword;
    const responseData = await getSearchResult(this.#keyword);
    this.#nextPageToken = responseData.nextPageToken;

    // 검색 결과가 없을 경우
    if (responseData.items.length === 0) {
      this.#view.showNotFoundImage(this.#videoList);

      return;
    }

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.#videoStorage.getVideo()
    );

    this.#view.renderSearchResult({
      element: this.#videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
