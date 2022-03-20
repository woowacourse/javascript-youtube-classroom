import Validator from './Validator.js';
import Helper from './Helper.js';

import KeywordInputView from '../Views/KeywordInputView.js';
import VideoView from '../Views/VideoView.js';
import SearchModalView from '../Views/SearchModalView.js';

import { _ } from '../utils/fx.js';

const keywordInputView = new KeywordInputView();
const searchModalView = new SearchModalView();
const videoView = new VideoView(Helper.fetchVideo);

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

const handleSaveVideoButtonClick = (videoId) => {
  try {
    Validator.checkFullOfDatabase();

    Helper.saveVideo(videoId);
  } catch ({ message }) {
    alert(message);
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal();
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
};

export default runApp;
