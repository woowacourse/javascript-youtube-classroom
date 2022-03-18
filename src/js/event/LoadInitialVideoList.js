import MainPagePresenter from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class LoadInitialVideoList {
  constructor() {
    this.mainPagePresenter = new MainPagePresenter();
  }

  action() {
    globalStore
      .initVideoList()
      .then(() =>
        this.mainPagePresenter.renderVideoList(globalStore.notWachedVideoList),
      );
  }
}
