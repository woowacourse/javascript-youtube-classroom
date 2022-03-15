import YoutubeAPI from '../YoutubeAPI/index.js';
import ValidationError from '../ValidationError/index.js';

import KeywordInputView from '../views/KeywordInputView.js';
import VideoView from '../views/VideoView.js';
import SearchModalView from '../views/SearchModalView.js';
import UserStorage from '../UserStorage/index.js';

import { checkKeyword } from '../Validator/index.js';

export const formatDate = (publishTime) => {
  const videoTime = new Date(publishTime.slice(0, 10));
  return (
    videoTime.getFullYear().toString() +
    '년 ' +
    (videoTime.getMonth() + 1).toString().padStart(2, '0') +
    '월 ' +
    videoTime.getDate().toString().padStart(2, '0') +
    '일'
  );
};

const youtubeAPI = new YoutubeAPI();

const polishVideos = (videos) => {
  const savedVideoIds = UserStorage.getVideoIds();

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
const searchModalView = new SearchModalView();
const videoView = new VideoView(async () => polishVideos(await youtubeAPI.getVideosInfo()));

const checkError = (error) => {
  if (error instanceof ValidationError) {
    alert(error.message);
    return;
  }
  throw error;
};

const handleKeywordInputSubmit = async (keyword) => {
  try {
    checkKeyword(keyword);
    videoView.refreshVideoScreen();
    videoView.onSkeleton();
    const videos = polishVideos(await youtubeAPI.search(keyword));
    videoView.offSkeleton();
    videoView.renderScreenByVideos(videos);
  } catch (error) {
    checkError(error);
  }
};

const handleSaveVideoButtonClick = (videoId) => {
  try {
    UserStorage.addVideoId(videoId);
  } catch (error) {
    checkError(error);
  }
};

const runApp = () => {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal();
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
};

export default runApp;
