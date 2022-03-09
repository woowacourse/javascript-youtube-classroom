import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';

class VideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(JSON.parse(this.dataset.video));
  }

  template(video) {
    return TEMPLATE.generateVideoItem(video);
  }

  setEvent() {}
}

customElements.define('video-item', VideoItem);

export default VideoItem;
