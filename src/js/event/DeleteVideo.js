import { mainPagePresenter } from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class DeleteVideo {
  constructor(data) {
    this.data = data;
  }

  action() {
    this.data.target.closest('li').remove();
    globalStore.removeLocalStorageVideo(this.data.id);
    globalStore.removeVideo(this.data.id);
    mainPagePresenter.renderNoVideo();
  }
}
