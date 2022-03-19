import { $, createElement } from '@Utils/Dom';
import { addEventOnce, runAnimation } from '@Utils/CustomEvent';
import { getTimeDiffToPercent } from '@Utils/ManageData';

const Snackbar = (message, delay = 2500) => {
  if (!!$('#snackbar')) return;

  let isProgressDone = false;

  let $snackbarContainer;
  let $snackbarProgress;

  const close = () => {
    $snackbarContainer.classList.add('disappear');
    addEventOnce('transitionend', $snackbarContainer, () => {
      $snackbarContainer.remove();
    });
  };

  const createSnackbar = () => {
    $snackbarContainer = createElement('DIV', {
      id: 'snackbar',
      className: 'snackbar',
      insertAdjacentHTML: [
        'afterbegin',
        ` <div class="message"><i class="fa-solid fa-circle-check"></i> ${message}</div>
          <div class="progress">
            <div class="percent"></div>
          </div>`,
      ],
    });
    $snackbarProgress = $('.percent', $snackbarContainer);

    $('#app').append($snackbarContainer);
  };

  const setBindEvents = () => {
    addEventOnce('click', $snackbarContainer, () => {
      isProgressDone = true;
      close();
    });
  };

  const onProgressStart = async callback => {
    const startTime = new Date().getTime();
    while (isProgressDone === false) {
      await runAnimation();
      const currentTime = new Date().getTime();
      const percent = getTimeDiffToPercent(startTime, currentTime, delay);

      $snackbarProgress.style.width = `${percent}%`;
      if (percent >= 100) isProgressDone = true;
    }

    callback();
  };

  createSnackbar();
  setBindEvents();
  onProgressStart(close);

  return {
    close,
  };
};

export default Snackbar;
