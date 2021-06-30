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
    this._initState();
    this._selectDOM();
    this._bindEvent();
    this._initObserver();
    this._initSubscription();
  }

  _initState() {
    this.keyword = "";
    this.keywordHistory = [];
    this.videos = [];
    this.savedVideos = savedVideoManager.getSavedVideos();
    this.nextPageToken = "";
  }

  _selectDOM() {

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

  _bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this._handleSearchKeyword();

    });

    this.$target.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.SEARCH_MODAL}`)) return;

      this._handleCloseModal();
    });

    this.$modalCloseBtn.addEventListener("click", this._handleCloseModal.bind(this));


    this.$videoWrapper.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.CLIP_SAVE_BTN}`)) return;

      this._handleSaveVideo(e.target);

    });

    this.$keywordHistory.addEventListener("click", e => {
      if (!e.target.classList.contains(`${CLASS_NAME.KEYWORD}`)) return;

      this._handleSearchClickedHistory(e.target.innerText);
    });
  }

  _initObserver() {
    this.observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          this._handleLoadMore();

        }
      },
      { root: this.$scrollArea },
    );

    this.observer.observe(this.$moreArea);
  }

  _initSubscription() {
    savedVideoManager.subscribe(this._setSaveVideosState.bind(this));
    savedVideoManager.subscribe(this._updateIsSavedOfVideos.bind(this));
  }

  _updateIsSavedOfVideos({ savedVideos }) {
    const videos = this.videos.map(video => {
      return {
        ...video,
        isSaved: savedVideos.map(_video => _video.videoId).includes(video.videoId),
      };
    });

    this._setVideosState({ videos });
  }

  _setSearchKeywordState({ keyword, keywordHistory, videos, nextPageToken }) {
    this.keyword = keyword ?? this.keyword;
    this.keywordHistory = keywordHistory ?? this.keywordHistory;
    this.videos = videos ?? this.videos;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this._render();
  }

  _setLoadMoreState({ videos, nextPageToken }) {
    this.videos = videos ?? this.videos;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this._render();
  }

  _setSaveVideosState({ savedVideos }) {
    this.savedVideos = savedVideos ?? this.savedVideos;

    this._renderSavedCount();
  }

  _setVideosState({ videos }) {
    this.videos = videos;

    this._renderCachedContent();
  }

  _showLoadingAnimation() {

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

  _hideLoadingAnimation() {
    $$(".skeleton").forEach($skeleton => $skeleton.remove());
  }

  async _handleSearchKeyword() {

    const keyword = this.$searchInput.value.trim();

    if (keyword.length === 0) {
      alert(ALERT_MESSAGE.EMPTY_KEYWORD_INPUT);
      return;
    }

    try {
      this.$scrollArea.scrollTo({ top: 0 });
      this._showLoadingAnimation();


      // dummy API Response 사용할 경우
      // const { items, nextPageToken } = dummySearchedData;
      const { items, nextPageToken } = await API.searchVideo(keyword);

      const videos = items.map(
        ({
          id: { videoId },
          snippet: { channelId, channelTitle, publishedAt, title, thumbnails },
        }) => ({

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
        ...this.keywordHistory.filter(history => history !== keyword),
      ];
      keywordHistory.splice(STANDARD_NUMS.MAX_SAVE_KEYWORD_COUNT, 1);
      this._setSearchKeywordState({ keyword, keywordHistory, videos, nextPageToken });

    } catch (err) {
      console.error(err);
    }
  }

  async _handleLoadMore() {
    if (!this.$target.classList.contains("open")) return;

    try {
      this._showLoadingAnimation();


      const { items, nextPageToken } = await API.searchVideo(this.keyword, this.nextPageToken);

      const nextVideos = items.map(
        ({
          id: { videoId },
          snippet: { channelId, channelTitle, publishedAt, title, thumbnails },
        }) => ({

          videoId,
          channelId,
          channelTitle,
          publishedAt,
          title,
          thumbnail: thumbnails.medium.url,

          isSaved: this.savedVideos.map(video => video.videoId).includes(videoId),
        }),
      );

      this._setLoadMoreState({ videos: [...this.videos, ...nextVideos], nextPageToken });

    } catch (err) {
      console.error(err);
    }
  }

  _handleCloseModal() {
    this._hideModal();
    this.props.changeMenu(MENU.WATCH_LATER);
  }

  _handleSaveVideo($saveBtn) {

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
    savedVideoManager._setState({ savedVideos });
    $saveBtn.classList.add("hidden");

    popMessage(this.$snackBar, SNACKBAR_MESSAGE.SAVE);
  }

  _handleSearchClickedHistory(keyword) {
    this.$searchInput.value = keyword;
    this._handleSearchKeyword();
  }

  _render() {
    this.$videoWrapper.insertAdjacentHTML(
      "beforeend",
      this.videos.length
        ? this.videos
            .filter(video => video.videoId)
            .map(video => createVideoTemplate(video, SECTION.MODAL))
            .join("")
        : createNoSearchResultTemplate(),
    );

    this._renderSavedCount();
    this.$keywordHistory.innerHTML = createKeywordHistoryTemplate(this.keywordHistory);
    this._hideLoadingAnimation();
  }

  _renderCachedContent() {
    this.$videoWrapper.innerHTML = this.videos.length
      ? this.videos
          .filter(video => video.videoId)
          .map(video => createVideoTemplate(video, SECTION.MODAL))
          .join("")
      : createNoSearchResultTemplate();
  }

  _renderSavedCount() {

    this.$savedVideoCount.textContent = `저장된 영상 갯수: ${this.savedVideos.length}/${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개`;
  }

  showModal() {
    this.$target.classList.add("open");
  }

  _hideModal() {

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
