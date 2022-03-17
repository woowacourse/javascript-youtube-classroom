import template from './templates';

class MainView {
  constructor(afterWatchVideoList, watchedVideoList) {
    this.$afterWatchVideoList = afterWatchVideoList;
    this.$watchedVideoList = watchedVideoList;
  }

  renderItems(savedItems) {
    this.$afterWatchVideoList.replaceChildren();
    if (savedItems.length > 0) {
      this.renderSavedItems(savedItems);
      return;
    }

    this.renderNoItems();
  }

  renderSavedItems(savedItems) {
    this.$afterWatchVideoList.insertAdjacentHTML(
      'beforeend',
      template.afterWatchVideoItem(savedItems),
    );
  }

  renderNoItems() {
    this.$afterWatchVideoList.insertAdjacentHTML('beforeend', template.noAfterWatchItem());
  }
}

export default MainView;
