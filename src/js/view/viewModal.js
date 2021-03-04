const $modal = document.querySelector('[data-js="youtube-search-modal"]');

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};
