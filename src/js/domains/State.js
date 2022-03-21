import SavedVideo from '../stores/SavedVideo';
import { on } from '../utils';

class State {
  static _instance = null;

  static get instance() {
    if (!State._instance) {
      State._instance = new State();
    }
    return State._instance;
  }

  subscribe(videoItem) {
    this.subscribeEvents(videoItem);
  }

  subscribeEvents(videoItem) {
    on('.video-item__state-button', '@watch', (e) => this.updateVideoState(e.detail.id), videoItem);
    on('.video-item__state-button', '@remove', (e) => this.removeVideo(e.detail.id), videoItem);
  }

  updateVideoState(videoId) {
    const savedVideos = SavedVideo.instance.getVideos().filter((video) => video.id !== videoId);
    const currentVideo = SavedVideo.instance.findVideo(videoId);

    currentVideo.isWatched = !currentVideo.isWatched;
    SavedVideo.instance.dispatch('watch', [...savedVideos, currentVideo], videoId);
  }

  removeVideo(videoId) {
    SavedVideo.instance.dispatch(
      'remove',
      SavedVideo.instance.getVideos().filter((video) => video.id !== videoId),
      videoId
    );
  }
}

export default State;
