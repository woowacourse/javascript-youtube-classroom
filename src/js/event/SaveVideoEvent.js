import MainPagePresenter from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class SaveVideoEvent {
  constructor(data) {
    this.data = data;
    this.mainPagePresenter = new MainPagePresenter();
  }

  action() {
    globalStore.saveVideoToLocalStorage(this.data.target.id);
    globalStore.appendVideo(this.data.target);
    this.mainPagePresenter.appendList(this.data.target);
  }
}
