export const isModalOpen = (currentTarget) => {
  return currentTarget.querySelector('.modal').classList.contains('open');
};

export const isModalCloseButton = (target) => {
  return target.closest('.js-modal-close-button');
};

export const isModalDimmedArea = (target) => {
  return target.classList.contains('modal');
};
