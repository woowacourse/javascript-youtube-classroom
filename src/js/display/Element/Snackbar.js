import { $, createElement } from '@Utils/Dom';
import { addEventOnce, runAnimation } from '@Utils/CustomEvent';
import { getTimeDiffToPercent } from '@Utils/ManageData';

export default class Snackbar {
  #message;
  #delay;
  #isProgressDone = false;

  $snackbarContainer;
  $snackbarProgress;

  constructor(message, delay = 2500) {
    if (!!$('#snackbar')) return;

    this.#message = message;
    this.#delay = delay;

    this.#createSnackbarElements();
    this.#setBindEvents();
    this.#onProgressStart(this.close);
  }

  #createSnackbarElements() {
    this.$snackbarContainer = createElement('DIV', {
      id: 'snackbar',
      className: 'snackbar',
      insertAdjacentHTML: [
        'afterbegin',
        ` <div class="message"><i class="fa-solid fa-circle-check"></i> ${this.#message}</div>
          <div class="progress">
            <div class="percent"></div>
          </div>`,
      ],
    });
    this.$snackbarProgress = $('.percent', this.$snackbarContainer);

    $('#app').append(this.$snackbarContainer);
  }

  #setBindEvents() {
    addEventOnce('click', this.$snackbarContainer, () => {
      this.#isProgressDone = true;
      this.close;
    });
  }

  async #onProgressStart(callback) {
    const startTime = new Date().getTime();
    while (this.#isProgressDone === false) {
      await runAnimation();
      const currentTime = new Date().getTime();
      const percent = getTimeDiffToPercent(startTime, currentTime, this.#delay);

      this.$snackbarProgress.style.width = `${percent}%`;
      if (percent >= 100) this.#isProgressDone = true;
    }

    callback();
  }

  close = async () => {
    this.$snackbarContainer.classList.add('disappear');
    addEventOnce('transitionend', this.$snackbarContainer, () => {
      this.$snackbarContainer.remove();
    });
  };
}
