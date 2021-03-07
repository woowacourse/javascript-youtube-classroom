import { $ } from "../utils/dom.js";
import { API_KEY } from "../apiKey.js";
import { STANDARD_NUMS, ALERT_MESSAGE, STORAGE } from "../utils/constants.js";
import { api } from "../utils/api.js";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage.js";
import { changeDateFormat } from "../utils/common.js";

// dummy API Response 사용할 경우
// import { dummyResponse } from "../utils/dummy.js";
class SearchModal {
  constructor() {
    this.initState();
    this.selectDOM();
    this.bindEvent();
    this.initObserver();
  }

  initState() {
    this.keyword = "";
    this.keywordHistory = [];
    this.videos = [];
    this.savedVideoIds = getLocalStorage(STORAGE.VIDEO_IDS, []);
    this.nextPageToken = "";
  }

  setState({ keyword, keywordHistory, videos, savedVideoIds, nextPageToken }) {
    this.keyword = keyword ?? this.keyword;
    this.keywordHistory = keywordHistory ?? this.keywordHistory;
    this.videos = videos ?? this.videos;
    this.savedVideoIds = savedVideoIds ?? this.savedVideoIds;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this.render();
    setLocalStorage(STORAGE.VIDEO_IDS, this.savedVideoIds);
  }

  selectDOM() {
    this.$target = $(".search-modal");
    this.$searchInput = $(".search-modal__input");
    this.$videoWrapper = $(".search-modal__video-wrapper");
    this.$scrollArea = $(".search-modal__scroll-area");
    this.$moreArea = $(".search-modal__more-area");
    this.$modalCloseBtn = $(".modal-close");
    this.$savedVideoCount = $(".search-modal__saved-video-count");
    this.$keywordHistory = $(".search-modal__keyword-history");
  }

  bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this.handleSearchKeyword();
    });

    this.$target.addEventListener("click", e => {
      if (!e.target.classList.contains("search-modal")) return;

      this.handleCloseModal();
    });

    this.$modalCloseBtn.addEventListener("click", this.handleCloseModal.bind(this));

    this.$videoWrapper.addEventListener("click", e => {
      if (!e.target.classList.contains("clip__save-btn")) return;

      this.handleSaveVideo(e.target.dataset.videoId);
    });
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          this.handleLoadMore();
        }
      },
      { root: this.$scrollArea },
    );

    this.observer.observe(this.$moreArea);
  }

  showLoadingAnimation() {
    const skeletonCardTemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`;

    this.$videoWrapper.insertAdjacentHTML(
      "beforeend",
      skeletonCardTemplate.repeat(STANDARD_NUMS.LOAD_CLIP_COUNT),
    );
  }

  async handleSearchKeyword() {
    const keyword = this.$searchInput.value.trim();

    if (keyword.length === 0) {
      alert(ALERT_MESSAGE.EMPTY_KEYWORD_INPUT);
      return;
    }

    this.showLoadingAnimation();

    try {
      // dummy API Response 사용할 경우
      // const { items, nextPageToken } = dummyResponse;
      const { items, nextPageToken } = await api.searchVideo(keyword);

      const videos = items.map(
        ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
          videoId,
          channelId,
          channelTitle,
          publishedAt,
          title,
          isSaved: this.savedVideoIds.includes(videoId),
        }),
      );

      const keywordHistory = [keyword, ...this.keywordHistory];
      keywordHistory.splice(STANDARD_NUMS.MAX_SAVE_KEYWORD_COUNT, 1);

      this.setState({ keyword, keywordHistory, videos, nextPageToken });
    } catch (err) {
      console.error(err);
    }
  }

  async handleLoadMore() {
    if (!this.$target.classList.contains("open")) {
      return;
    }

    try {
      const { items, nextPageToken } = await api.searchNextVideo(this.keyword, this.nextPageToken);

      const nextVideos = items.map(
        ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
          videoId,
          channelId,
          channelTitle,
          publishedAt,
          title,
          isSaved: this.savedVideoIds.includes(videoId),
        }),
      );

      this.setState({ videos: [...this.videos, ...nextVideos], nextPageToken });
    } catch (err) {
      console.error(err);
    }
  }

  handleCloseModal() {
    this.hideModal();
  }

  handleSaveVideo(savedVideoId) {
    if (this.savedVideoIds.length === STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT) {
      alert(ALERT_MESSAGE.OVER_MAX_SAVE_VIDEO_COUNT);

      return;
    }

    const savedVideoIds = [...this.savedVideoIds, savedVideoId];
    const videos = [...this.videos].map(video => {
      if (video.videoId === savedVideoId) {
        video.isSaved = true;
      }

      return video;
    });

    this.setState({ videos, savedVideoIds });
  }

  render() {
    this.videos.length
      ? (this.$videoWrapper.innerHTML = this.videos
          .map(video => createSearchedVideoTemplate(video))
          .join(""))
      : (this.$videoWrapper.innerHTML = createNoSearchResultTemplate());

    this.$savedVideoCount.textContent = `저장된 영상 갯수: ${this.savedVideoIds.length}/${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개`;
    this.$keywordHistory.innerHTML = createKeywordHistoryTemplate(this.keywordHistory);
  }

  showModal() {
    this.$target.classList.add("open");
  }

  hideModal() {
    this.$target.classList.remove("open");
  }
}

const createSearchedVideoTemplate = video => `
<article class="clip">
  <div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube.com/embed/${video.videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${video.title}</h3>
    <div>
      <a
        href="https://www.youtube.com/channel/${video.channelId}"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="channel-name mt-1"
      >
      ${video.channelTitle}
      </a>
      <div class="meta">
        <p>${changeDateFormat(video.publishedAt)}</p>
      </div>
      <div class="d-flex justify-end">
        <button class="clip__save-btn btn ${video.isSaved ? "hidden" : ""}" data-video-id="${
  video.videoId
}">⬇️ 저장</button>
      </div>
    </div>
  </div>
</article>`;

const createNoSearchResultTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-result-image' src='src/images/status/not_found.png' alt='결과 없음'>
    <p>검색 결과가 존재하지 않습니다.</p>
  </div>`;

const createKeywordHistoryTemplate = keywords => `
  <span class="text-gray-700">최근 검색어: </span>
  ${keywords.map(keyword => `<a class="keyword-history__keyword chip">${keyword}</a>`).join("")}
`;

export default SearchModal;
