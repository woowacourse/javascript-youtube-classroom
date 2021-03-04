// TODO : 제일마지막에 상수화. 숫자, 셀렉터 / 파일명좀 바꿀수 있으면 바꾸기 ㅎㅎ.. /모달도 좀 넣어주자
import { $, $$ } from '../utils/util.js';
class MyYoutubeSearchController {
  constructor(youtube, storage, view) {
    this.youtube = youtube;
    this.storage = storage;
    this.view = view;
  }

  init = () => {
    this.storage.init();
    this.handleSearch();
    this.handleModalScroll();
    this.view.renderMyVideoInfosSection(0); // TODO : this.view.init 으로 빼기
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

    this.handleIframeLoad();
    this.handleSaveVideo();
  };

  saveVideo = e => {
    e.target.classList.add('invisible');
    const videoInfo = JSON.parse(e.target.dataset.info);
    this.storage.saveVideo(videoInfo);
    this.view.renderMyVideoInfosSection(this.storage.savedVideoLength); // TODO :renderMyVideoInfosSection 이름 바꾸기. Length count 로 바꾸기
  };

  getScrollTop = target => {
    return target.scrollTop;
  };

  getDocumentHeight = () => {
    const body = $('#search-video-wrapper');
    return Math.max(body.scrollHeight, body.offsetHeight);
  };

  removeSkeleton = event => {
    //TODO : event.target.parentNode.parentNode 변수화
    event.target.parentNode.parentNode.classList.remove('skeleton');
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

  handleIframeLoad = () => {
    // TODO : handleVideoLoad로 바꾸기
    $$('.clip iframe').forEach(iframe => {
      iframe.addEventListener('load', event => this.removeSkeleton(event));
    });
  };

  handleModalScroll = () => {
    // TODO :  handleSearchModalScroll 로 바꾸기
    $('#search-video-wrapper').addEventListener('scroll', event => {
      // 아래 메서드화, util화 하면서 getScrollTop, getDocumentHeight 같은거를 유틸화해두고, 메서드에선 그거 불러와서 addVideoSearch 수행
      if (
        this.getScrollTop(event.target) <
        this.getDocumentHeight() - $('#search-video-wrapper').clientHeight
      )
        return;

      this.addVideosBySearch();
      // fetch
    });
  };
}

export default MyYoutubeSearchController;
