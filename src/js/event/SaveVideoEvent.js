import { mainPagePresenter } from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class SaveVideoEvent {
  constructor(data) {
    this.data = data;
  }

  reaction() {
    globalStore.saveVideoToLocalStorage(this.data.target.id);
    globalStore.appendVideo(this.data.target);
    mainPagePresenter.appendList(this.data.target);
  }
}
