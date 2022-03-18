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
    addEvent(this, 'click', '.video-item__state-button', () => this.emitEvent());
  }

  emitEvent() {
    const id = this.dataset.videoId;

    emit('.video-item__state-button', '@watch', { id }, this);
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
