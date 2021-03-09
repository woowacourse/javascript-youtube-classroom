import { $ } from '../utils/util.js';

class NavView {
  toggleNavButton = watched => {
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
