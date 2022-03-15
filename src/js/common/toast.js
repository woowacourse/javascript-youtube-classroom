const toast = () => {
  const toastContainer = document.getElementById('toast');
  let removeToast;

  return (text) => {
    if (removeToast) return;

    toastContainer.classList.add('reveal');
    toastContainer.textContent = text;

    removeToast = setTimeout(() => {
      toastContainer.classList.remove('reveal');
      clearTimeout(removeToast);
      removeToast = undefined;
    }, 1500);
  };
};

export default toast;
