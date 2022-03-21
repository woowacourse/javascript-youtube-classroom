import ManageVideoStorage from '../domain/ManageVideoStorage';
import SavedVideosView from './SavedVideosView/SavedVideosView';
import SearchModalView from './SearchModal/SearchModalView';

class YoutubeClassRoomView {
  constructor() {
    this.manageVideoStorage = new ManageVideoStorage();
    this.savedVideosView = new SavedVideosView(this.manageVideoStorage);
    this.searchModalView = new SearchModalView(this.renderOnModalClose, this.manageVideoStorage);
  }

  renderOnModalClose = () => {
    this.savedVideosView.renderVideoListUpdate();
  };
}

export default YoutubeClassRoomView;
