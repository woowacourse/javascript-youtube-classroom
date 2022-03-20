import Validator from './Validator.js';
import Helper from './Helper.js';

import KeywordInputView from '../Views/KeywordInputView.js';
import VideoView from '../Views/VideoView.js';
import SearchModalView from '../Views/SearchModalView.js';
import SwitchVideoView from '../Views/SwitchVideoView.js';
import UnseenVideoListView from '../Views/UnseenVideoListView.js';

import { _ } from '../utils/fx.js';

const keywordInputView = new KeywordInputView();
const searchModalView = new SearchModalView();
const videoView = new VideoView(Helper.fetchVideo);
const switchVideoView = new SwitchVideoView();
const unseenVideoListView = new UnseenVideoListView();

const handleKeywordInputSubmit = (keyword) => {
  try {
    Validator.checkKeyword(keyword);

    videoView.refreshVideoScreen();
    videoView.onSkeleton();
    _.go(keyword, Helper.searchVideo, (videos) => {
      videoView.renderScreenByVideos(videos);
      videoView.offSkeleton();
    });
  } catch ({ message }) {
    alert(message);
  }
};

const handleSaveVideoButtonClick = (video) => {
  try {
    Validator.checkFullOfDatabase();

    Helper.saveVideo(video);
  } catch ({ message }) {
    alert(message);
  }
};

const handleSwitchSeenButtonClick = _.pipe(
  Helper.loadVideo,
  unseenVideoListView.renderScreenByVideos.bind(unseenVideoListView),
);

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal();
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
  switchVideoView.bindSwitchToUnseenScreen(handleSwitchSeenButtonClick);
  handleSwitchSeenButtonClick();
};

export default runApp;
