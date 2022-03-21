import SavedVideosView from './SavedVideosView/SavedVideosView';
import SearchModalView from './SearchModal/SearchModalView';

class YoutubeClassRoomView {
  constructor() {
    this.savedVideosView = new SavedVideosView();
    this.searchModalView = new SearchModalView(this.renderOnModalClose);
  }

  renderOnModalClose = () => {
    this.savedVideosView.renderVideoListUpdate();
  };
}

export default YoutubeClassRoomView;
