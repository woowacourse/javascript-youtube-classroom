import { $ } from './index.js';

const confirmTemplate = message => {
  return `
    <div class="js-confirm-modal modal open">
      <div class="confirm-inner">
        <div class="confirm-text">
          <span>${message}</span>
        </div>
        <ul class="confirm-button-list list-style-none p-0">
          <li><button type="button" class="js-cancel-button mr-3">❌ 취소</button></li>
          <li><button type="button" class="js-confirm-button">⭕ 확인</button></li>
        </ul>
      </div>
    </div>
    `;
};

export const customConfirm = (message, yesCallback) => {
  $('#app').insertAdjacentHTML('beforeend', confirmTemplate(message));

  $('.js-confirm-modal').addEventListener('click', ({ currentTarget, target }) => {
    if (target.tagName !== 'BUTTON') {
      return;
    }

    if (target.classList.contains('js-confirm-button')) {
      yesCallback();
    }

    currentTarget.remove();
  });
};
