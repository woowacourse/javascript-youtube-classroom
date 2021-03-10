import { closeModal } from '../../view/modal.js';

const isDimmed = (target) => {
  return (
    target.classList.contains('modal') && target.classList.contains('open')
  );
};

const isCloseButton = (target) => {
  return target.closest('[data-js="youtube-serach-modal__close"]') !== null;
};

export const onModalClose = ({ target }) => {
  if (isDimmed(target) || isCloseButton(target)) {
    closeModal();
  }
};
