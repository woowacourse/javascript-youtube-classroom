import getSearchResult from "./api/getSearchResult";
import generatorTemplate from "./templates";
import notFountImage from "../assets/images/not_found.png";
import { parsedDate } from "./utils/utils";

const mockObject = () => {
  const array = [];

  for (let index = 0; index < 10; index++) {
    array.push({
      id: {
        videoId: index,
      },
      snippet: {
        channelTitle: "essential;",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ",
          },
        },
        publishTime: "2022-03-02T11:39:31Z",
        title: "[Playlist] 너무 좋은데 괜찮으시겠어요?",
      },
    });
  }

  return array;
};

export default class YoutubeApp {
  constructor(userLibrary) {
    this.searchModalButton = document.querySelector("#search-modal-button");
    this.modalContainer = document.querySelector(".modal-container");
    this.searchButton = document.querySelector("#search-button");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");
    this.searchForm = document.querySelector("#search-form");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");

    this.bind();
    this.userLibrary = userLibrary;
  }

  bind() {
    this.searchModalButton.addEventListener(
      "click",
      this.onSubmitSearchModalButton
    );
    this.searchButton.addEventListener("click", this.onSubmitSearchButton);
    this.videoList.addEventListener(
      "scroll",
      this.throttle(this.onScrollVideoList, 300)
    );
    this.videoList.addEventListener("click", this.onClickSaveButton);
  }

  onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const videoId = target.closest(".video-item").dataset.videoId;
    this.userLibrary.setData(videoId);
    target.classList.add("hide");
  };

  onSubmitSearchModalButton = (e) => {
    e.preventDefault();
    this.modalContainer.classList.remove("hide");
  };

  onSubmitSearchButton = (e) => {
    e.preventDefault();
    this.videoList.insertAdjacentHTML(
      "beforeend",
      generatorTemplate.skeleton()
    );

    this.search(this.searchInputKeyword.value);
  };

  throttle = (callback, delayTime) => {
    let timerId;

    return () => {
      if (timerId) return;

      timerId = setTimeout(() => {
        timerId = null;
        callback();
      }, delayTime);
    };
  };

  onScrollVideoList = async () => {
    // scrollHeight = clientHeight + scrollTop
    if (
      this.videoList.scrollHeight - 40 <=
      this.videoList.clientHeight + this.videoList.scrollTop
    ) {
      this.videoList.insertAdjacentHTML(
        "beforeend",
        generatorTemplate.skeleton()
      );

      const responseData = {
        items: mockObject(),
      };

      // const responseData = await getSearchResult(
      //   this.keyword,
      //   this.nextPageToken
      // );

      // this.nextPageToken = responseData.nextPageToken;

      const result = responseData.items
        .map((item) =>
          generatorTemplate.videoItem(
            {
              id: item.id.videoId,
              channel: item.snippet.channelTitle,
              defaultThumbnail: item.snippet.thumbnails.high.url,
              title: item.snippet.title,
              date: parsedDate(item.snippet.publishTime),
            },
            this.userLibrary.getData()
          )
        )
        .join("");

      document
        .querySelectorAll(".skeleton")
        .forEach((element) => this.videoList.removeChild(element));

      this.videoList.insertAdjacentHTML("beforeend", result);
    }
  };

  async search(keyword) {
    // this.keyword = keyword;
    // const responseData = await getSearchResult(this.keyword);
    // this.nextPageToken = responseData.nextPageToken;
    const responseData = {
      items: mockObject(),
    };
    console.log(responseData);

    // 검색 없음 일 경우
    if (responseData.items.length === 0) {
      this.searchResult.removeChild(this.videoList);
      this.searchResult.classList.add("search-result--no-result");
      this.searchResult.insertAdjacentHTML(
        "beforeend",
        generatorTemplate.noResult()
      );

      document.querySelector(".no-result__image").src = notFountImage;

      return;
    }

    const skeletons = document.querySelectorAll(".skeleton");
    skeletons.forEach((skeleton) => {
      this.videoList.removeChild(skeleton);
    });

    const result = responseData.items
      .map((item) =>
        generatorTemplate.videoItem(
          {
            id: item.id.videoId,
            channel: item.snippet.channelTitle,
            defaultThumbnail: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            date: parsedDate(item.snippet.publishTime),
          },
          this.userLibrary.getData()
        )
      )
      .join("");

    this.videoList.insertAdjacentHTML("beforeend", result);
  }
}
