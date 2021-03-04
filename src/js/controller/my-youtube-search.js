import { $, $$ } from '../utils/util.js';
class MyYoutubeSearchController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.handleSearch();
  }

  getSearchInput = () => {
    return $('#search-youtube-input').value;
  };

  getVideosBySearch = async () => {
    const query = this.getSearchInput();
    await this.model.getVideoInfosBySearch({ query });

    this.view.renderVideoArticles(this.model.videoInfos);
    if (this.model.videoInfos.length === 0) {
      this.view.renderNotFound();
    }
    this.handleIframeLoad();
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

  removeSkeleton = event => {
    event.target.parentNode.parentNode.classList.remove('skeleton');
  };
}

export default MyYoutubeSearchController;
