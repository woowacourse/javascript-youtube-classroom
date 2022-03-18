import MainPagePresenter from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export class ChangeTab {
  constructor(data) {
    this.data = data;
    this.mainPagePresenter = new MainPagePresenter();
  }

  action() {
    this.mainPagePresenter.toggleTabChoosed(
      this.data.id,
      globalStore.videoStorage,
    );
  }
}
