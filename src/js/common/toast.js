let removeToast;

const toast = (string) => {
  const toast = document.getElementById('toast');

  toast.classList.contains('reveal')
    ? (clearTimeout(removeToast), removeToast = setTimeout(() => {
      document.getElementById('toast').classList.remove('reveal');
    }, 1500))
    : removeToast = setTimeout(() => {
      document.getElementById('toast').classList.remove('reveal');
    }, 1500);
  toast.classList.add('reveal'),
  toast.textContent = string;
};

export default toast;
