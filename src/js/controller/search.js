// TODO : 제일마지막에 상수화. 숫자, 셀렉터 / 파일명좀 바꿀수 있으면 바꾸기 ㅎㅎ.. /모달도 좀 넣어주자
import { CLASS, SEARCH, SELECTOR } from '../constants/constant.js';
import { $, $$, isScrollUnfinished } from '../utils/util.js';
class SearchController {
  constructor(youtube, storage, view) {
    this.youtube = youtube;
    this.storage = storage;
    this.view = view;
  }

  init = () => {
    this.storage.init();
    this.view.init();
    this.handleSearch();
    this.handleSearchModalScroll();
  };

  getSearchInput = () => {
    return $('#search-youtube-input').value;
  };

  getVideosBySearch = async event => {
    event.preventDefault();
    this.view.resetView();
    this.youtube.resetNextPageToken();
    this.addVideosBySearch();
  };

  addVideosBySearch = async () => {
    const query = this.getSearchInput();

    this.storage.saveRecentKeyword(query);
    this.view.renderRecentKeywordSection(this.storage.recentKeywords);

    await this.youtube.getVideoInfosBySearch({ query });
    if (this.youtube.videoInfos.length === 0) {
      this.view.renderNotFound();
      return;
    }

    this.youtube.videoInfos.forEach(info => {
      const isSaved = this.storage.findVideoByInfo(info);
      this.view.renderVideoArticle(info, isSaved);
    });

    this.handleVideoLoad();
    this.handleSaveVideo();
  };

  saveVideo = e => {
    e.target.classList.add(CLASS.INVISIBLE);
    const videoInfo = JSON.parse(e.target.dataset.info);
    this.storage.saveVideo(videoInfo);

    this.view.renderSavedVideoCountSection(this.storage.savedVideoCount);
  };

  fetchVideo = event => {
    const searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    if (isScrollUnfinished(searchVideoWrapper, event.target)) return;

    this.addVideosBySearch();
  };

  removeSkeleton = event => {
    const article = event.target.closest('article');
    article.classList.remove(CLASS.SKELETON);
  };

  handleSaveVideo = () => {
    [...$$(SELECTOR.SAVE_VIDEO_BUTTON)]
      .slice(-SEARCH.FETCH_VIDEO_LENGTH)
      .forEach(save => {
        save.addEventListener('click', event => this.saveVideo(event));
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
