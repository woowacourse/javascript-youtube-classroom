class SnackBarView {
  showSnackBar = text => {
    const $snackBar = document.querySelector('#snackbar');
    $snackBar.innerHTML = text;

    $snackBar.classList.toggle('show');
    setTimeout(() => {
      $snackBar.classList.toggle('show');
    }, 3000);
  };
}

export default SnackBarView;
