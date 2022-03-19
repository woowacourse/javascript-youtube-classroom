import { SELECTOR } from '@Constants/Selector';
import { ACTION_TYPE } from '@Constants/String';
import { $ } from '@Utils/Dom';
import { addEventDelegate } from '@Utils/CustomEvent';
import YoutubeSaveListStore from '../../domain/YoutubeSaveListStore';

export default class Navigation {
  $container = $(SELECTOR.ID.CLASSROOM_NAVIGATION);

  constructor() {
    this.setBindEvents();
  }

  setBindEvents() {
    addEventDelegate(this.$container, '#classroom-watched-filter-button', {
      eventType: 'click',
      handler: this.handleFilterChange,
    });

    addEventDelegate(this.$container, SELECTOR.ID.SEARCH_MODAL_BUTTON, {
      eventType: 'click',
      handler: this.handleOpenModal,
    });
  }

  handleFilterChange = ({ target: $target }) => {
    if (!$target.classList.contains('button')) {
      return;
    }

    const { filter: listType } = $target.dataset;

    const $filterButton = $target.closest('#classroom-watched-filter-button');
    $filterButton.dataset.focus = listType;

    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST_FILTER);
    YoutubeSaveListStore.dispatch(ACTION_TYPE.UPDATE_SAVE_LIST);
  };

  handleOpenModal = ({ target: $target }) => {
    const modalId = $target.dataset.modal;
    const $modalContainer = $(SELECTOR.ID.MODAL_CONTAINER);

    $modalContainer.classList.remove('hide');
    $(`#${modalId}`, $modalContainer).classList.add('show');
  };
}
