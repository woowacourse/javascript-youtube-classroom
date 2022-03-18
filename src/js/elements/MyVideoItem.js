import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit, confirm } from '../utils';
import SavedVideo from '../stores/SavedVideo';
import State from '../domains/State';

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
      confirm('해당 영상을 삭제하시겠습니까?', () =>
        emit('.video-item__state-button', '@remove', { id }, this)
      );
    }
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
