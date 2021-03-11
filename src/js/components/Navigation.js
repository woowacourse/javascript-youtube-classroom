import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleIsChecked, handleOpenModal }) {
    this.$navigation = $('nav');
    this.$uncheckedButton = $('.js-unchecked-video');
    this.$checkedButton = $('.js-checked-video');
    this.handleIsChecked = handleIsChecked;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-unchecked-video')) {
        this.handleIsChecked(false);
        this.changeButtonColor(target);

        return;
      }

      if (target.classList.contains('js-checked-video')) {
        this.handleIsChecked(true);
        this.changeButtonColor(target);

        return;
      }

      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();

        return;
      }
    });
  }

  changeButtonColor(clickedButton) {
    this.$navigation.querySelectorAll('.js-color-btn ').forEach($ele => {
      if ($ele === clickedButton) {
        $ele.classList.add('bg-cyan-100');
      } else {
        $ele.classList.remove('bg-cyan-100');
      }
    });
  }
}
