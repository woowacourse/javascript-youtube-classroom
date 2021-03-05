// TODO : 제일마지막에 상수화. 숫자, 셀렉터 / 파일명좀 바꿀수 있으면 바꾸기 ㅎㅎ.. /모달도 좀 넣어주자
import { $, $$, isScrollBottom } from '../utils/util.js';
class MyYoutubeSearchController {
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
    e.target.classList.add('invisible');
    const videoInfo = JSON.parse(e.target.dataset.info);
    this.storage.saveVideo(videoInfo);
    this.view.renderMyVideoInfosSection(this.storage.savedVideoLength); // TODO :renderMyVideoInfosSection 이름 바꾸기. Length count 로 바꾸기
  };

  fetchVideo = event => {
    const searchVideoWrapper = $('#search-video-wrapper');
    if (!isScrollBottom(searchVideoWrapper, event.target)) return;

    this.addVideosBySearch();
  };

  removeSkeleton = event => {
    const article = event.target.parentNode.parentNode;
    article.classList.remove('skeleton');
  };

  handleSaveVideo = () => {
    $$('.js-save-button').forEach(save => {
      save.addEventListener('click', event => this.saveVideo(event));
    });
  };

  handleSearch = () => {
    $('#search-youtube-form').addEventListener('submit', event => {
      this.getVideosBySearch(event);
    });
  };

  handleVideoLoad = () => {
    $$('.clip iframe').forEach(iframe => {
      iframe.addEventListener('load', event => this.removeSkeleton(event));
    });
  };

  handleSearchModalScroll = () => {
    $('#search-video-wrapper').addEventListener('scroll', event => {
      this.fetchVideo(event);
    });
  };
}

export default MyYoutubeSearchController;
