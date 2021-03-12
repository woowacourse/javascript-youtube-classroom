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
  #youtubeModel;
  #storageModel;
  #searchView;
  #savedView;
  #snackBarView;

  constructor(youtubeModel, storageModel, searchView, savedView, snackBarView) {
    this.#youtubeModel = youtubeModel;
    this.#storageModel = storageModel;
    this.#searchView = searchView;
    this.#savedView = savedView;
    this.#snackBarView = snackBarView;
  }

  init = () => {
    this.#handleSearch();
    this.#handleSearchModalScroll();
    this.#handleSaveVideo();
  };

  #getSearchInput = () => {
    return $(SELECTOR.SEARCH_YOUTUBE_INPUT).value;
  };

  #getVideosBySearch = async event => {
    event.preventDefault();
    this.#searchView.resetView();
    this.#youtubeModel.resetNextPageToken();
    this.#addVideosBySearch();
  };

  #renderSearchedVideo = () => {
    if (this.#youtubeModel.searchedCount === 0) return;

    this.#youtubeModel.searchedVideos.forEach(info => {
      const isSaved = this.#storageModel.findVideoSaved(info);
      this.#searchView.renderVideoArticle(info, isSaved);
    });

    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  #addVideosBySearch = async () => {
    const query = this.#getSearchInput();

    this.#storageModel.saveRecentKeyword(query);
    this.#searchView.renderRecentKeywordSection(
      this.#storageModel.recentKeywords
    );

    await this.#youtubeModel.getVideosBySearch({ query });

    this.#searchView.toggleNotFoundSearchedVideo(
      this.#youtubeModel.searchedCount
    );

    this.#renderSearchedVideo();
  };

  #renderSavedVideo = videoInfo => {
    if (this.#storageModel.showWatched === true) return;

    this.#savedView.appendSavedVideo(videoInfo);

    handleVideoLoad(
      $(SELECTOR.SAVED_VIDEO_WRAPPER).lastChild.querySelector(
        SELECTOR.VIDEO_IFRAME
      )
    );
    this.#snackBarView.showSnackBar(SNACK_BAR.SAVED_MESSAGE);
  };

  #saveVideo = e => {
    e.target.classList.add(CLASS.INVISIBLE);

    const videoInfo = { ...e.target.dataset, watched: false };
    this.#storageModel.saveVideo(videoInfo);
    this.#renderSavedVideo(videoInfo);

    this.#searchView.renderSavedVideoCountSection(
      this.#storageModel.savedVideoCount
    );
  };

  #fetchVideo = event => {
    const { scrollHeight, offsetHeight, clientHeight } = $(
      SELECTOR.SEARCH_VIDEO_WRAPPER
    );

    const scrollArgs = { scrollHeight, offsetHeight, clientHeight };
    if (isScrollUnfinished(scrollArgs, event.target.scrollTop)) return;

    this.#addVideosBySearch();
  };

  #handleSaveVideo = () => {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('click', event => {
      if (event.target.classList.contains(CLASS.SAVE_BUTTON)) {
        this.#saveVideo(event);
      }
    });
  };

  #handleSearch = () => {
    $(SELECTOR.SEARCH_YOUTUBE_FORM).addEventListener('submit', event => {
      this.#getVideosBySearch(event);
    });
  };

  #handleSearchModalScroll = () => {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('scroll', event => {
      this.#fetchVideo(event);
    });
  };
}

export default SearchController;
