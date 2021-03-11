import { EXCEED_SAVED_VIDEO_COUNT_MSG } from '../constants/alertMessage.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import videoInfos from '../states/videoInfos.js';

function createVideoInfo(videoDataset) {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    isWatched: false,
  };
}

function saveVideo($video) {
  const videoInfo = createVideoInfo($video.dataset);

  videoInfos.add(videoInfo);
}

function handleVideoSave({ target }) {
  if (!target.classList.contains('js-save-button')) return;
  if (videoInfos.size >= MAX_SAVED_VIDEO_COUNT) {
    alert(EXCEED_SAVED_VIDEO_COUNT_MSG);

    return;
  }

  const $saveButton = target;

  saveVideo($saveButton.closest('.js-video'));
  $saveButton.hidden = true;
}

export default handleVideoSave;
