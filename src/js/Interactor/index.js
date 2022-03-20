import Validator from './Validator.js';
import Helper from './Helper.js';

import KeywordInputView from '../Views/KeywordInputView.js';
import VideoView from '../Views/VideoView.js';
import SearchModalView from '../Views/SearchModalView.js';
import SwitchVideoView from '../Views/SwitchVideoView.js';
import UnseenVideoListView from '../Views/UnseenVideoListView.js';
import SeenVideoListView from '../Views/SeenVideoListView.js';

import { _ } from '../utils/fx.js';

const keywordInputView = new KeywordInputView();
const searchModalView = new SearchModalView();
const videoView = new VideoView(Helper.fetchVideo);
const switchVideoView = new SwitchVideoView();
const unseenVideoListView = new UnseenVideoListView();
const seenVideoListView = new SeenVideoListView();

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

const handleSearchModalButtonClick = () => {
  keywordInputView.refreshInput();
  videoView.refreshVideoScreen();
};

const handleSwitchUnseenButtonClick = _.pipe(
  Helper.loadVideo,
  _.filter((video) => !video.checked),
  unseenVideoListView.renderScreenByVideos.bind(unseenVideoListView),
);

const handleSwitchSeenButtonClick = _.pipe(
  Helper.loadVideo,
  _.filter((video) => video.checked),
  seenVideoListView.renderScreenByVideos.bind(seenVideoListView),
);

const handleSaveVideoButtonClick = (video) => {
  try {
    Validator.checkFullOfDatabase();

    Helper.saveVideo(video);
    handleSwitchUnseenButtonClick();
  } catch ({ message }) {
    alert(message);
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal(handleSearchModalButtonClick);
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
  switchVideoView.bindSwitchToSeenScreen(handleSwitchSeenButtonClick);
  switchVideoView.bindSwitchToUnseenScreen(handleSwitchUnseenButtonClick);
  handleSwitchUnseenButtonClick();
};

export default runApp;
