// TODO : 제일마지막에 상수화. 숫자, 셀렉터 / 파일명좀 바꿀수 있으면 바꾸기 ㅎㅎ.. /모달도 좀 넣어주자
import { CLASS, SEARCH, SELECTOR, SNACK_BAR } from '../constants/constant.js';
import { $, $$, isScrollUnfinished } from '../utils/util.js';
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
    const videoInfosLength = this.youtube.videoInfos.length;

    this.storage.saveRecentKeyword(query);
    this.searchView.renderRecentKeywordSection(this.storage.recentKeywords);

    await this.youtube.getVideoInfosBySearch({ query });

    this.searchView.toggleNotFoundSearchedVideo(videoInfosLength);
    if (videoInfosLength === 0) return;
    console.log(this.youtube.videoInfos);
    this.youtube.videoInfos.forEach(info => {
      const isSaved = this.storage.findVideoByInfo(info);
      this.searchView.renderVideoArticle(info, isSaved);
    });

    this.handleVideoLoad();
  };

  saveVideo = e => {
    e.target.classList.add(CLASS.INVISIBLE);

    const videoInfo = { ...e.target.dataset, watched: false };
    this.storage.saveVideo(videoInfo);
    this.searchView.renderSavedVideoCountSection(this.storage.savedVideoCount);

    if (this.storage.showWatched === true) return;
    this.savedView.appendSavedVideo(videoInfo);
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

  removeSkeleton = event => {
    const article = event.target.closest('article');
    article.classList.remove(CLASS.SKELETON);
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

  handleVideoLoad = () => {
    $$(SELECTOR.VIDEO_IFRAME).forEach(iframe => {
      iframe.addEventListener('load', event => this.removeSkeleton(event));
    });
  };

  handleSearchModalScroll = () => {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('scroll', event => {
      this.fetchVideo(event);
    });
  };
}

export default SearchController;
