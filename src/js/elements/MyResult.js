import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';

import './MyVideoList';

class MyResult extends CustomElement {
  template() {
    return TEMPLATE.MY_RESULT;
  }
}

customElements.define('my-result', MyResult);

export default MyResult;
