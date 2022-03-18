import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import Save from '../domains/Save';

class MyVideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(Save.instance.findVideo(this.dataset.videoId));
  }

  template(video) {
    return TEMPLATE.generateMyVideoItem(video);
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
