import ArrayStorage from './ArrayStorage.js';

export default class VideoStorage extends ArrayStorage {
  constructor(key) {
    super(key);
  }
  popVideoByVideoId(videoId) {
    const videos = this.getItem();
    const poppedVideo = videos.find(video => video.videoId === videoId);
    if (!poppedVideo) {
      return;
    }
    this.setItem(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
  }
  sendVideoTo(videoStorage, videoId) {
    const sendingVideo = this.popVideoByVideoId(videoId);
    if (!sendingVideo) {
      return;
    }
    videoStorage.pushItem(sendingVideo);
  }
}
