import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { $ } from '../utils';

import './MyVideoList';

class MyResult extends CustomElement {
  template() {
    return TEMPLATE.MY_RESULT;
  }

  switchMenu(e) {
    if (e.target.tagName !== 'LABEL') return;

    this[e.target.dataset.action]();
  }

  showWatchedVideoList() {
    $('#unwatched-video-list', this).classList.add('hidden');
    $('#watched-video-list', this).classList.remove('hidden');
  }

  showUnwatchedVideoList() {
    $('#watched-video-list', this).classList.add('hidden');
    $('#unwatched-video-list', this).classList.remove('hidden');
  }
}

customElements.define('my-result', MyResult);

export default MyResult;
