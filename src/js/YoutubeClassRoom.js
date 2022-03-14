import SearchModalView from './View/SearchModalView';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import HomeView from './View/HomeView';

export default class YoutubeClassRoom {
  constructor() {
    this.searchVideoManager = new SearchVideoManager();
    this.saveVideoManager = new SaveVideoManager();
    this.homeView = new HomeView();
    this.searchModalView = new SearchModalView(this.searchVideoManager, this.saveVideoManager);
  }
}
