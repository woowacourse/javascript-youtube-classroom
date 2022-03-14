import YoutubeAPI from '../YoutubeAPI/index.js';
import ValidationError from '../ValidationError/index.js';

import KeywordInputView from '../views/KeywordInputView.js';
import VideoView from '../views/VideoView.js';
import SearchModalView from '../views/SearchModalView.js';

import { checkKeyword } from '../Validator/index.js';

const youtubeAPI = new YoutubeAPI();
const keywordInputView = new KeywordInputView();
const searchModalView = new SearchModalView();
const videoView = new VideoView(async () => await youtubeAPI.videos());

const handleKeywordInputSubmit = async (keyword) => {
  try {
    checkKeyword(keyword);
    videoView.refreshVideoScreen();
    videoView.onSkeleton();
    const videos = await youtubeAPI.search(keyword);
    videoView.offSkeleton();
    videoView.renderScreenByVideos(videos);
  } catch (error) {
    if (error instanceof ValidationError) return alert(error.message);
    throw error;
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
	searchModalView.bindShowModal();
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo();
};

export default runApp;
