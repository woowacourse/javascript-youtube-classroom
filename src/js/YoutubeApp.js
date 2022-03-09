import getSearchResult from "./api/getSearchResult";
import generatorTemplate from "./templates";
import notFountImage from "../assets/images/not_found.png";

const mockObject = {
  id: {
    videoId: 1,
  },
  snippet: {
    channelTitle: "essential;",
    thumbnails: {
      default:
        "https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ",
    },
    publishTime: "2022년 3월 2일",
    title: "[Playlist] 너무 좋은데 괜찮으시겠어요?",
  },
};

export default class YoutubeApp {
  constructor() {
    this.searchModalButton = document.querySelector("#search-modal-button");
    this.modalContainer = document.querySelector(".modal-container");
    this.searchButton = document.querySelector("#search-button");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");
    this.searchForm = document.querySelector("#search-form");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");

    this.bind();
  }

  bind() {
    this.searchModalButton.addEventListener("click", this.displayModal);
    this.searchButton.addEventListener("click", this.searchMovie);
  }

  // onSubmitSearchModalButton
  displayModal = (e) => {
    e.preventDefault();
    this.modalContainer.classList.remove("hide");
  };

  // onSubmitSearchButton
  searchMovie = (e) => {
    e.preventDefault();
    this.videoList.insertAdjacentHTML(
      "beforeend",
      generatorTemplate.skeleton()
    );
    this.search(this.searchInputKeyword.value);
  };

  async search(keyword) {
    // const resultArray = await getSearchResult(keyword);
    const resultArray = Array.from({ length: 10 }, () => mockObject);
    console.log(resultArray);

    if (resultArray.length === 0) {
      this.searchResult.removeChild(this.videoList);
      this.searchResult.classList.add("search-result--no-result");
      this.searchResult.insertAdjacentHTML(
        "beforeend",
        generatorTemplate.noResult()
      );

      document.querySelector(".no-result__image").src = notFountImage;

      return;
    }

    // console.log(resultArray);

    const skeletons = document.querySelectorAll(".skeleton");
    skeletons.forEach((skeleton) => {
      this.videoList.removeChild(skeleton);
    });

    const result = resultArray
      .map((item) =>
        generatorTemplate.videoItem({
          id: item.id.videoId,
          channel: item.snippet.channelTitle,
          defaultThumbnail: item.snippet.thumbnails.default,
          title: item.snippet.title,
          date: item.snippet.publishTime,
        })
      )
      .join("");

    this.videoList.insertAdjacentHTML("beforeend", result);

    return resultArray;
  }
}
