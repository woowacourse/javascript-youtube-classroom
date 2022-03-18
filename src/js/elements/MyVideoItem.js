import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import Save from '../domains/Save';
import { addEvent, emit } from '../utils';

class MyVideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(Save.instance.findVideo(this.dataset.videoId));
    Save.instance.subscribeWatchEvent(this);
  }

  template(video) {
    return TEMPLATE.generateMyVideoItem(video);
  }

  setEvent() {
    addEvent(this, 'click', '.video-item__state-button', (e) => this.emitEvent(e));
  }

  // eslint-disable-next-line max-lines-per-function
  emitEvent(e) {
    const id = this.dataset.videoId;

    switch (e.target.dataset.action) {
      case 'watch':
        emit('.video-item__state-button', '@watch', { id }, this);
        break;

      case 'remove':
        if (window.confirm('해당 영상을 삭제하시겠습니까?')) {
          emit('.video-item__state-button', '@remove', { id }, this);
        }
        break;

      default:
        break;
    }
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
