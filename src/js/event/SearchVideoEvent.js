import SearchMachine from '../domain/SearchMachine';
import { searchModalPresenter } from '../presenter/SearchModalPresenter';
import { globalStore } from '../store/VideoStore';

export default class SearchVideoEvent {
  constructor(data) {
    this.data = data;
    this.searchModalPresenter = searchModalPresenter;
    this.searchMachine = new SearchMachine();
  }

  reaction() {
    this.initialAction(this.data);
    this.searchModalPresenter.renderSkeletonImage();
    globalStore
      .search()
      .then((items) => this.searchModalPresenter.renderResult(items))
      .catch((err) => {
        this.data.errored.isExisted = true;
        this.searchModalPresenter.renderNetworkError(err);
      })
      .finally(this.searchModalPresenter.removeSkeleton);
  }

  initialAction({ initial }) {
    if (initial) {
      globalStore.keyword = this.data.keyword;
      this.data.errored.isExisted = false;
      this.searchModalPresenter.renderInitState();
      globalStore.initPageToken();
    }
  }
}
