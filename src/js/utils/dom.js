export const showElement = ($target) => {
  $target.classList.remove("d-none-hard");
};

export const hideElement = ($target) => {
  $target.classList.add("d-none-hard");
};

export const openModal = ($target) => {
  $target.classList.add("open");
};

export const closeModal = ($target) => {
  $target.classList.remove("open");
};
