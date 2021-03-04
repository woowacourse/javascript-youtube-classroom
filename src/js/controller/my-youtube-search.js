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
    this.view.renderMyVideoInfosSection(0);
  };

  getSearchInput = () => {
    return $('#search-youtube-input').value;
  };

  getVideosBySearch = async () => {
    this.view.resetView();
    const query = this.getSearchInput();
    this.storage.saveRecentKeyword(query);
    this.getRecentKeyword();
    await this.youtube.getVideoInfosBySearch({ query });

    this.youtube.videoInfos.forEach(info => {
      const save = this.storage.findVideoByInfo(info);

      this.view.renderVideoArticle(info, save);
    });

    if (this.youtube.videoInfos.length === 0) {
      this.view.renderNotFound();
    }
    this.handleIframeLoad();
    this.handleSaveVideo();
  };

  getRecentKeyword = () => {
    this.view.renderRecentKeywordSection(this.storage.recentKeywords);
  };

  saveVideo = e => {
    const videoInfo = JSON.parse(e.target.dataset.info);
    e.target.classList.add('invisible');
    this.storage.saveVideo(videoInfo);
    this.view.renderMyVideoInfosSection(this.storage.savedVideoLength);
  };

  handleSaveVideo = () => {
    $$('.js-save-button').forEach(save => {
      save.addEventListener('click', event => this.saveVideo(event));
    });
  };

  handleSearch = () => {
    $('#search-youtube-form').addEventListener('submit', event => {
      event.preventDefault();
      this.getVideosBySearch();
    });
  };

  handleIframeLoad = () => {
    $$('.clip iframe').forEach(iframe => {
      iframe.addEventListener('load', event => this.removeSkeleton(event));
    });
  };

  handleModalScroll = () => {
    $('#search-video-wrapper').addEventListener('scroll', event => {
      if (
        this.getScrollTop(event.target) <
        this.getDocumentHeight() - $('#search-video-wrapper').clientHeight
      )
        return;

      this.getVideosBySearch();
      // fetch
    });
  };

  getScrollTop = target => {
    return target.scrollTop;
  };

  getDocumentHeight = () => {
    const body = $('#search-video-wrapper');
    return Math.max(body.scrollHeight, body.offsetHeight);
  };

  removeSkeleton = event => {
    event.target.parentNode.parentNode.classList.remove('skeleton');
  };
}

export default MyYoutubeSearchController;
