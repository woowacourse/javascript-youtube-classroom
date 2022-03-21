import { mainPagePresenter } from '../presenter/MainPagePresenter';
import { globalStore } from '../store/VideoStore';

export default class LoadInitialVideoList {
  constructor() {}

  reaction() {
    globalStore
      .initVideoList()
      .then(() =>
        mainPagePresenter.renderVideoList(globalStore.notWachedVideoList),
      );
  }
}
