import { mainPagePresenter } from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class ChangeVideoStatus {
  constructor(data) {
    this.data = data;
  }

  reaction() {
    this.data.target.closest('li').remove();
    globalStore.toggleState(this.data.id);
    globalStore.toggleWatchedToStarge(this.data.id);
    mainPagePresenter.renderNoVideo();
  }
}
