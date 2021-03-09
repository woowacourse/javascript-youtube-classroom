class SnackBarView {
  constructor() {
    this.throttle = null;
  }
  showSnackBar = text => {
    const $snackBar = document.querySelector('#snackbar');
    $snackBar.innerHTML = text;

    if (!this.throttle) {
      $snackBar.classList.toggle('show');
      this.throttle = setTimeout(() => {
        this.throttle = null;
        $snackBar.classList.toggle('show');
      }, 3000);
    }
  };
}

export default SnackBarView;
