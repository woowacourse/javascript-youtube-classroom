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
    $('#unwatched-video-list').classList.add('hidden');
    $('#watched-video-list').classList.remove('hidden');
  }

  showUnwatchedVideoList() {
    $('#watched-video-list').classList.add('hidden');
    $('#unwatched-video-list').classList.remove('hidden');
  }
}

customElements.define('my-result', MyResult);

export default MyResult;
