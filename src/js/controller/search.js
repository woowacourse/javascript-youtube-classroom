// TODO : 제일마지막에 상수화. 숫자, 셀렉터 / 파일명좀 바꿀수 있으면 바꾸기 ㅎㅎ.. /모달도 좀 넣어주자
import { CLASS, SEARCH, SELECTOR, SNACK_BAR } from '../constants/constant.js';
import {
  $,
  $$,
  handleVideoLoad,
  handleVideosLoad,
  isScrollUnfinished,
} from '../utils/util.js';
class SearchController {
  constructor(youtube, storage, searchView, savedView, snackBarView) {
    this.youtube = youtube;
    this.storage = storage;
    this.searchView = searchView;
    this.savedView = savedView;
    this.snackBarView = snackBarView;
  }

  init = () => {
    this.storage.init();
    this.handleSearch();
    this.handleSearchModalScroll();
    this.handleSaveVideo();
  };

  getSearchInput = () => {
    return $(SELECTOR.SEARCH_YOUTUBE_INPUT).value;
  };

  getVideosBySearch = async event => {
    event.preventDefault();
    this.searchView.resetView();
    this.youtube.resetNextPageToken();
    this.addVideosBySearch();
  };

  addVideosBySearch = async () => {
    const query = this.getSearchInput();

    this.storage.saveRecentKeyword(query);
    this.searchView.renderRecentKeywordSection(this.storage.recentKeywords);

    await this.youtube.getVideoInfosBySearch({ query });

    this.searchView.toggleNotFoundSearchedVideo(this.youtube.videoCount);
    if (this.youtube.videoCount === 0) return;

    this.youtube.videoInfos.forEach(info => {
      const isSaved = this.storage.findVideoByInfo(info);
      this.searchView.renderVideoArticle(info, isSaved);
    });

    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  saveVideo = e => {
    e.target.classList.add(CLASS.INVISIBLE);

    const videoInfo = { ...e.target.dataset, watched: false };
    this.storage.saveVideo(videoInfo);
    this.searchView.renderSavedVideoCountSection(this.storage.savedVideoCount);

    if (this.storage.showWatched === true) return;

    this.savedView.appendSavedVideo(videoInfo);

    handleVideoLoad(
      $(SELECTOR.SAVED_VIDEO_WRAPPER).lastChild.querySelector(
        SELECTOR.VIDEO_IFRAME
      )
    );
    this.snackBarView.showSnackBar(SNACK_BAR.SAVED_MESSAGE);
  };

  fetchVideo = event => {
    const { scrollHeight, offsetHeight, clientHeight } = $(
      SELECTOR.SEARCH_VIDEO_WRAPPER
    );

    if (
      isScrollUnfinished(
        { scrollHeight, offsetHeight, clientHeight },
        event.target.scrollTop
      )
    )
      return;

    this.addVideosBySearch();
  };

  handleSaveVideo = () => {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('click', event => {
      if (event.target.classList.contains(CLASS.SAVE_BUTTON)) {
        this.saveVideo(event);
      }
    });
  };

  handleSearch = () => {
    $(SELECTOR.SEARCH_YOUTUBE_FORM).addEventListener('submit', event => {
      this.getVideosBySearch(event);
    });
  };

  handleSearchModalScroll = () => {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('scroll', event => {
      this.fetchVideo(event);
    });
  };
}

export default SearchController;
