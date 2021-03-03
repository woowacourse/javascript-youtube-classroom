import { $ } from '../utils/util.js';
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
  };

  handleSearch = () => {
    $('#search-youtube-button').addEventListener('click', () => {
      this.getVideosBySearch();
    });
  };
}

export default MyYoutubeSearchController;
