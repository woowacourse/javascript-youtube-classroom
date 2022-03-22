import ManageVideoStorage from './domain/ManageVideoStorage';
import SavedVideosView from './view/SavedVideosView/SavedVideosView';
import SearchModalView from './view/SearchModal/SearchModalView';

class YoutubeClassRoomApp {
  constructor() {
    this.manageVideoStorage = new ManageVideoStorage();
    this.savedVideosView = new SavedVideosView(this.manageVideoStorage);
    this.searchModalView = new SearchModalView(this.renderOnModalClose, this.manageVideoStorage);
  }

  renderOnModalClose = () => {
    this.savedVideosView.renderVideoListUpdate();
  };
}

// eslint-disable-next-line
new YoutubeClassRoomApp();
