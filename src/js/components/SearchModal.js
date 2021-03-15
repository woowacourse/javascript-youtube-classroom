import { $, $$, popMessage } from "../utils/dom.js";
import {
  MENU,
  STANDARD_NUMS,
  ALERT_MESSAGE,
  SECTION,
  CLASS_NAME,
  SNACKBAR_MESSAGE,
} from "../utils/constants.js";
import API from "../utils/api.js";
import { createVideoTemplate } from "../utils/templates.js";
import savedVideoManager from "../model/SavedVideoManager.js";

// dummy API Response 사용할 경우
// import { dummySearchedData } from "../data/dummy.js";
class SearchModal {
  constructor(props) {
    this.props = props;
    this.initState();
    this.selectDOM();
    this.bindEvent();
    this.initObserver();
    this.initSubscription();
  }

  initState() {
    this.keyword = "";
    this.keywordHistory = [];
    this.videos = [];
    this.savedVideos = savedVideoManager.getSavedVideos();
    this.nextPageToken = "";
  }

  updateIsSavedOfVideos({ savedVideos }) {
    const videos = this.videos.map(video => {
      return {
        ...video,
        isSaved: savedVideos.map(_video => _video.videoId).includes(video.videoId),
      };
    });

    this.setVideosState({ videos });
  }

  setVideosState({ videos }) {
    this.videos = videos;

    this.renderCachedContent();
  }

  setSearchKeywordState({ keyword, keywordHistory, videos, nextPageToken }) {
    this.keyword = keyword ?? this.keyword;
    this.keywordHistory = keywordHistory ?? this.keywordHistory;
    this.videos = videos ?? this.videos;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this.render();
  }

  setLoadMoreState({ videos, nextPageToken }) {
    this.videos = videos ?? this.videos;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this.render();
  }

  setSaveVideosState({ savedVideos }) {
    this.savedVideos = savedVideos ?? this.savedVideos;

    this.renderSavedCount();
  }

  initSubscription() {
    savedVideoManager.subscribe(this.setSaveVideosState.bind(this));
    savedVideoManager.subscribe(this.updateIsSavedOfVideos.bind(this));
  }

  selectDOM() {
    this.$target = $(`.${CLASS_NAME.SEARCH_MODAL}`);
    this.$searchInput = $(`.${CLASS_NAME.SEARCH_MODAL_INPUT}`);
    this.$videoWrapper = $(`.${CLASS_NAME.SEARCH_MODAL_VIDEO_WRAPPER}`);
    this.$scrollArea = $(`.${CLASS_NAME.SCROLL_AREA}`);
    this.$moreArea = $(`.${CLASS_NAME.MORE_AREA}`);
    this.$savedVideoCount = $(`.${CLASS_NAME.SAVED_VIDEO_COUNT}`);
    this.$modalCloseBtn = $(`.${CLASS_NAME.MODAL_CLOSE}`);
    this.$keywordHistory = $(`.${CLASS_NAME.KEYWORD_HISTORY}`);
    this.$snackBar = $(`.${CLASS_NAME.SNACKBAR}`);
  }

  bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this.handleSearchKeyword();
    });

    this.$target.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.SEARCH_MODAL}`)) return;

      this.handleCloseModal();
    });

    this.$modalCloseBtn.addEventListener("click", this.handleCloseModal.bind(this));

    this.$videoWrapper.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.CLIP_SAVE_BTN}`)) return;

      this.handleSaveVideo(e.target);
    });

    this.$keywordHistory.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.KEYWORD}`)) return;

      this.handleSearchClickedHistory(e.target.innerText);
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

    this.$videoWrapper.innerHTML = "";
    this.$videoWrapper.insertAdjacentHTML(
      "beforeend",
      skeletonCardTemplate.repeat(STANDARD_NUMS.LOAD_CLIP_COUNT),
    );
  }

  hideLoadingAnimation() {
    $$(".skeleton").forEach($skeleton => $skeleton.remove());
  }

  async handleSearchKeyword() {
    const keyword = this.$searchInput.value.trim();

    if (keyword.length === 0) {
      alert(ALERT_MESSAGE.EMPTY_KEYWORD_INPUT);
      return;
    }

    try {
      this.$scrollArea.scrollTo({ top: 0 });
      this.showLoadingAnimation();

      // dummy API Response 사용할 경우
      // const { items, nextPageToken } = dummySearchedData;
      const { items, nextPageToken } = await API.searchVideo(keyword);

      const videos = items.map(
        ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
          videoId,
          channelId,
          channelTitle,
          publishedAt,
          title,
          isSaved: this.savedVideos.map(video => video.videoId).includes(videoId),
        }),
      );

      const keywordHistory = [
        keyword,
        ...this.keywordHistory.filter(_keyword => _keyword !== keyword),
      ];
      keywordHistory.splice(STANDARD_NUMS.MAX_SAVE_KEYWORD_COUNT, 1);
      this.setSearchKeywordState({ keyword, keywordHistory, videos, nextPageToken });
    } catch (err) {
      console.error(err);
    }
  }

  async handleLoadMore() {
    if (!this.$target.classList.contains("open")) return;

    try {
      this.showLoadingAnimation();

      const { items, nextPageToken } = await API.searchVideo(this.keyword, this.nextPageToken);

      const nextVideos = items.map(
        ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
          videoId,
          channelId,
          channelTitle,
          publishedAt,
          title,
          isSaved: this.savedVideos.map(video => video.videoId).includes(videoId),
        }),
      );

      this.setLoadMoreState({ videos: [...this.videos, ...nextVideos], nextPageToken });
    } catch (err) {
      console.error(err);
    }
  }

  handleCloseModal() {
    this.hideModal();
    this.props.changeMenu(MENU.WATCH_LATER);
  }

  handleSaveVideo($saveBtn) {
    const savedVideoId = $saveBtn.dataset.videoId;

    if (this.savedVideos.length === STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT) {
      alert(ALERT_MESSAGE.OVER_MAX_SAVE_VIDEO_COUNT);

      return;
    }

    const newSavedVideo = {
      ...this.videos.find(video => video.videoId === savedVideoId),
      isWatched: false,
      isLiked: false,
    };
    const savedVideos = [...this.savedVideos, newSavedVideo];
    savedVideoManager.setState({ savedVideos });
    $saveBtn.classList.add("hidden");

    popMessage(this.$snackBar, SNACKBAR_MESSAGE.SAVE);
  }

  handleSearchClickedHistory(keyword) {
    this.$searchInput.value = keyword;
    this.handleSearchKeyword();
  }

  render() {
    this.$videoWrapper.insertAdjacentHTML(
      "beforeend",
      this.videos.length
        ? this.videos
            .filter(video => video.videoId)
            .map(video => createVideoTemplate(video, SECTION.MODAL))
            .join("")
        : createNoSearchResultTemplate(),
    );

    this.renderSavedCount();
    this.$keywordHistory.innerHTML = createKeywordHistoryTemplate(this.keywordHistory);
    this.hideLoadingAnimation();
  }

  renderCachedContent() {
    this.$videoWrapper.innerHTML = this.videos.length
      ? this.videos
          .filter(video => video.videoId)
          .map(video => createVideoTemplate(video, SECTION.MODAL))
          .join("")
      : createNoSearchResultTemplate();
  }

  renderSavedCount() {
    this.$savedVideoCount.textContent = `저장된 영상 갯수: ${this.savedVideos.length}/${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개`;
  }

  showModal() {
    this.$target.classList.add("open");
  }

  hideModal() {
    this.$target.classList.remove("open");
  }
}

const createNoSearchResultTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-result-image' src='src/images/status/not_found.png' alt='결과 없음'>
    <p>검색 결과가 존재하지 않습니다.</p>
  </div>`;

const createKeywordHistoryTemplate = keywords => `
  <span class="text-gray-700">최근 검색어: </span>
  ${keywords
    .map(keyword => `<a class="keyword-history__keyword chip mr-1">${keyword}</a>`)
    .join("")}
`;

export default SearchModal;
