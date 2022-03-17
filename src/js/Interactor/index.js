import YoutubeAPI from '../YoutubeAPI/index.js';
import ValidationError from '../ValidationError/index.js';
import KeywordInputView from '../views/KeywordInputView.js';
import VideoView from '../views/VideoView.js';
import SearchModalView from '../views/SearchModalView.js';
import UserStorage from '../UserStorage/index.js';
import checkKeyword from '../Validator/index.js';
import { convertYYYYMMDD } from '../utils/index.js';

const youtubeAPI = new YoutubeAPI();

const polishVideos = (videos) => {
  const savedVideoIds = UserStorage.getVideoIds();

  return videos.map(({ id, snippet }) => ({
    id: id.videoId,
    thumbnail: snippet.thumbnails.default.url,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    date: convertYYYYMMDD(snippet.publishTime),
    saved: savedVideoIds.includes(id.videoId),
  }));
};

const keywordInputView = new KeywordInputView();
const searchModalView = new SearchModalView();
const videoView = new VideoView(async () => polishVideos(await youtubeAPI.videos()));

const handleKeywordInputSubmit = async (keyword) => {
  try {
    checkKeyword(keyword);
    videoView.refreshVideoScreen();
    videoView.onSkeleton();
    const videos = polishVideos(await youtubeAPI.search(keyword));
    videoView.offSkeleton();
    videoView.renderScreenByVideos(videos);
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);

      return;
    }
    throw error;
  }
};

const handleSaveVideoButtonClick = (videoId) => {
  try {
    UserStorage.addVideoId(videoId);
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);

      return;
    }
    throw error;
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal();
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
};

export default runApp;
