import YoutubeAPI from './YoutubeAPI/index.js';
import ValidationError from './ValidationError/index.js';
import { checkKeyword } from './Validator/index.js';
import searchModalView from './views/searchModal.js';
import classRoomView from './views/classRoomView.js';

const youtubeAPI = new YoutubeAPI();

const handleKeywordInputSubmit = async (keyword) => {
  try {
    checkKeyword(keyword);
    const videos = await youtubeAPI.search(keyword);
    searchModalView.renderScreenByVideos(videos);
  } catch (error) {
    if (error instanceof ValidationError) return alert(error.message);
    throw error;
  }
};

classRoomView.launchOpenModal();
searchModalView.launchCloseModal();
searchModalView.bindKeywordInputSubmit(handleKeywordInputSubmit);
