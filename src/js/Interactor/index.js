import YoutubeAPI from '../YoutubeAPI/index.js';
import ValidationError from '../ValidationError/index.js';

import KeywordInputView from '../views/KeywordInputView.js';
import VideoView from '../views/VideoView.js';
import SearchModalView from '../views/SearchModalView.js';
import UserStorage from '../UserStorage/index.js';

import { checkKeyword } from '../Validator/index.js';

import { formatDate } from '../utils/index.js';
import SavedVideoView from '../views/SavedVideoView.js';

const youtubeAPI = new YoutubeAPI();

const polishVideos = (videos) => {
  const savedVideoDataList = UserStorage.getVideoData();
  const savedVideoIds = savedVideoDataList.map((video) => video.id);

  return videos.map(({ id, snippet }) => ({
    id: id.videoId,
    thumbnail: snippet.thumbnails.default.url,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    date: formatDate(snippet.publishTime),
    saved: savedVideoIds.includes(id.videoId),
  }));
};

const keywordInputView = new KeywordInputView();
const savedVideoView = new SavedVideoView(UserStorage.getVideoData(), UserStorage.editVideoData);
const searchModalView = new SearchModalView();
const videoView = new VideoView(async () => polishVideos(await youtubeAPI.getVideosInfo()));

const handleKeywordInputSubmit = async (keyword) => {
  try {
    checkKeyword(keyword);
    videoView.refreshVideoScreen();
    videoView.onSkeleton();
    const videos = polishVideos(await youtubeAPI.search(keyword));
    videoView.offSkeleton();
    videoView.renderScreenByVideos(videos);
  } catch (error) {
    alert(error.message);
  }
};

const handleSaveVideoButtonClick = (videoData) => {
  try {
    UserStorage.addVideoData(videoData);
  } catch (error) {
    alert(error.message);
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
};

export default runApp;
