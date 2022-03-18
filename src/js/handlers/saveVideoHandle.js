import videoStorage from '../localStorage/videoStorage.js';
import { validateAbleToSaveVideo } from '../validates/validate.js';

const getVideoObjectFromElement = element => {
  return {
    id: element.dataset.videoId,
    imgSrc: element.children[0].currentSrc,
    title: element.children[1].textContent,
    channelTitle: element.children[2].textContent,
    publishedDate: element.children[3].textContent,
    watched: false,
  };
};

export const handleSaveButtonClick = e => {
  if (!e.target.classList.contains('video-item__save-button')) {
    return;
  }
  try {
    const saveTargetVideo = getVideoObjectFromElement(e.target.parentElement);
    const savedVideos = videoStorage.getSavedVideos();

    // 저장된 비디오가 없는 경우, 바로 저장
    if (!savedVideos) {
      videoStorage.setSavedVideos([saveTargetVideo]);
      return;
    }

    // 저장된 비디오가 있는 경우, 뒤에 추가
    validateAbleToSaveVideo(savedVideos, saveTargetVideo);
    videoStorage.setSavedVideos([...savedVideos, saveTargetVideo]);
  } catch (error) {
    alert(error.message);
  } finally {
    const saveVideoButton = e.target.closest('button');
    saveVideoButton.remove();
  }
};
