import state from '../library/state.js';

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

  state.addVideoInfo(videoInfo);
}

function handleVideoSave({ target }) {
  if (!target.classList.contains('js-save-button')) return;
  if (state.videoInfos.size >= 1) {
    alert('최대 저장 개수는 100개입니다.');

    return;
  }

  const $saveButton = target;

  saveVideo($saveButton.closest('.js-video'));
  $saveButton.hidden = true;
}

export default handleVideoSave;
