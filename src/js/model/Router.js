export class Router {
  constructor({ onChangePage }) {
    this.onChangePage = onChangePage;
    this.currentPage = '';

    this.initEvent();
  }

  initEvent() {
    window.onhashchange = () => {
      this.setState({ currentPage: window.location.hash });
    };
  }

  setState({ currentPage }) {
    this.currentPage = currentPage;
    this.onChangePage();
  }
}
