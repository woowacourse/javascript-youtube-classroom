import { $ } from '../utils/util.js';

class NavView {
  toggleNavButton = watched => {
    $('#towatch-videos-button').classList.toggle('bg-cyan-100', !watched);
    $('#watched-videos-button').classList.toggle('bg-cyan-100', watched);
  };
}

export default NavView;
