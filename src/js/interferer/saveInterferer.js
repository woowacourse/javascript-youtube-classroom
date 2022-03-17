import saveMachine from '../domain/saveMachine';
import SaveView from '../ui/saveView';
import { on } from '../util/event';
import { $ } from '../util/selector';

class SaveInterferer {
  constructor(mainInterferer) {
    this.$videoListContainer = $('.video-list');
    this.saveView = new SaveView(this.$videoListContainer);
    this.mainInterferer = mainInterferer;
  }

  init() {
    on(this.$videoListContainer, '@save', (e) => this.saveVideo(e.detail.newVideo));
  }

  saveVideo(newVideo) {
    try {
      saveMachine.saveVideoToLocalStorage(newVideo);
      this.mainInterferer.init();
    } catch (err) {
      alert(err.message);
    }
  }
}

export default SaveInterferer;
