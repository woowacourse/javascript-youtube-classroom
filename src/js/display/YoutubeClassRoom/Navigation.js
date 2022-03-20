import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE, UI_ACTION, NAVIGATION } from '@Constants';
import UIStore from '@Store/UIStore';

export default class Navigation {
  constructor() {
    this.container = $('#classroom-navigation');
    this.$watchLaterNavigation = $('#watch-later-list-button', this.container);
    this.$watchedNavigation = $('#watched-list-button', this.container);
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '#classroom-navigation',
      handler: this.handleClickNavigation,
    });
  }

  handleClickNavigation = ({ target: $target }) => {
    const { navigation } = $target.dataset;
    if (!navigation) return;
    if (navigation === NAVIGATION.SEARCH_MODAL) {
      UIStore.dispatch(UI_ACTION.OPEN_MODAL);
      return;
    }
    this.selectNavigation(navigation);
    UIStore.dispatch(UI_ACTION.SELECT_PAGE, navigation);
  };

  selectNavigation(navigation) {
    if (navigation === NAVIGATION.WATCH_LATER) {
      this.$watchedNavigation.classList.remove('selected');
      this.$watchLaterNavigation.classList.add('selected');
      return;
    }
    this.$watchLaterNavigation.classList.remove('selected');
    this.$watchedNavigation.classList.add('selected');
  }
}
