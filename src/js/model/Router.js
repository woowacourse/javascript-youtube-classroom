import { $$ } from '../util/index.js';
import { FILTER } from '../constants/index.js';

const ROUTE_KEY = {
  ['#watch']: FILTER.WATCH,
  ['#watched']: FILTER.WATCHED,
  ['#liked']: FILTER.LIKED,
};

export class Router {
  constructor({ onChangePage }) {
    this.$routeButtons = $$('.js-route-btn');
    this.onChangePage = onChangePage;
    this.currentPage = '';

    this.initEvent();
  }

  initEvent() {
    window.onhashchange = () => {
      this.setState({ currentPage: window.location.hash });
    };
  }

  changeButtonColor() {
    this.$routeButtons.forEach($ele => {
      if ($ele.href.split('/').slice(-1)[0] === this.currentPage) {
        $ele.classList.add('bg-cyan-100');
      } else {
        $ele.classList.remove('bg-cyan-100');
      }
    });
  }

  setState({ currentPage }) {
    this.currentPage = currentPage;

    this.onChangePage(ROUTE_KEY[this.currentPage]);
    this.changeButtonColor();
  }
}
