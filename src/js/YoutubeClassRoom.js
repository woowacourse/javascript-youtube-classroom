import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import Storage from './Storage';

export default class YoutubeClassRoom {
  constructor() {
    this.storage = new Storage();

    this.searchVideoManager = new SearchVideoManager(this.storage);
    this.saveVideoManager = new SaveVideoManager(this.storage);
    
    this.homeView = new HomeView();
    this.searchModalView = new SearchModalView();
  }
}
