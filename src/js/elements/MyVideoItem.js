import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit, confirm } from '../utils';
import SavedVideo from '../stores/SavedVideo';
import State from '../domains/State';
import { INFO_MESSAGE } from '../constants';

class MyVideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(SavedVideo.instance.findVideo(this.dataset.videoId));
    State.instance.subscribe(this);
  }

  template(video) {
    return TEMPLATE.generateMyVideoItem(video);
  }

  setEvent() {
    addEvent(this, 'click', '.video-item__state-button', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    const id = this.dataset.videoId;
    const { action } = e.target.dataset;

    if (action === 'watch') {
      emit('.video-item__state-button', '@watch', { id }, this);
      return;
    }

    if (action === 'remove') {
      confirm(INFO_MESSAGE.CONFIRM_REMOVE, () =>
        emit('.video-item__state-button', '@remove', { id }, this)
      );
    }
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
