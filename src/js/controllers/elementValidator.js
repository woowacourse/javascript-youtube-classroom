export const isModalOpen = (currentTarget) => {
  return currentTarget.querySelector('.modal').classList.contains('open');
};

export const isModalDimmedArea = (target) => {
  return target.classList.contains('modal');
};

export const isModalCloseButton = (target) => {
  return target.closest('.js-modal-close-button');
};
