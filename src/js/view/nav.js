import { $ } from '../utils/util.js';

class NavView {
  toggleNavButton = watched => {
    // TODO : 개선할수 있으면 개선하기
    if (watched) {
      $('#towatch-videos-button').classList.remove('bg-cyan-100');
      $('#watched-videos-button').classList.add('bg-cyan-100');
    } else {
      $('#towatch-videos-button').classList.add('bg-cyan-100');
      $('#watched-videos-button').classList.remove('bg-cyan-100');
    }
  };
}

export default NavView;
