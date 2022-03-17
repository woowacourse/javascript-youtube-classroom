import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE, UI_ACTION } from '@Constants';
import UIStore from '@Domain/UIStore';

export default class Navigation {
  constructor() {
    this.container = $('#classroom-navigation');
    // this.$modalContainer =
    // this.$modal = $('#search-modal');
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
    if (navigation === 'searchModal') {
      UIStore.dispatch(UI_ACTION.OPEN_MODAL);
      return;
    }
    UIStore.dispatch(UI_ACTION.SELECT_PAGE, navigation);
  };

  handleOpenModal = () => {
    const $modalContainer = $('#modal');
    $modalContainer.classList.remove('hide');
    this.$modal.classList.add('show');
  };
}
