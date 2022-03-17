import saveMachine from '../domain/saveMachine';
import SaveView from '../ui/saveView';
import { on } from '../util/event';
import { $ } from '../util/selector';

class SaveInterferer {
  constructor() {
    this.$videoListContainer = $('.video-list');
    this.saveView = new SaveView(this.$videoListContainer);
  }

  init() {
    on(this.$videoListContainer, '@save', (e) => this.saveVideo(e.detail.newVideo));
  }

  saveVideo(newVideo) {
    try {
      saveMachine.saveVideoToLocalStorage(newVideo);
    } catch (err) {
      alert(err.message);
    }
  }
}

export default SaveInterferer;
