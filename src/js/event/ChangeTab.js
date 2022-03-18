import { mainPagePresenter } from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export class ChangeTab {
  constructor(data) {
    this.data = data;
  }

  action() {
    mainPagePresenter.toggleTabChoosed(this.data.id, globalStore.videoStorage);
  }
}
