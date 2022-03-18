import SearchVideoManager from './Manager/SearchVideoManager';
import { SaveVideoManager } from './Manager/SaveVideoManager';
import HomeView from './View/HomeView';

export default class YoutubeClassRoom {
  constructor() {
    this.searchVideoManager = new SearchVideoManager();
    this.saveVideoManager = new SaveVideoManager();

    this.homeView = new HomeView(this.searchVideoManager, this.saveVideoManager);
  }
}
