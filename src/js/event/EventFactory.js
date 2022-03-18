import ChangeVideoStatus from './ChangeVideoStatus';
import LoadInitialVideoList from './LoadInitialVideoList';
import SaveVideoEvent from './SaveVideoEvent';
import SearchVideoEvent from './SearchVideoEvent';

export default class EventFactory {
  static generate(name, data) {
    switch (name) {
      case 'SEARCH_VIDEO':
        new SearchVideoEvent(data).action();
        break;
      case 'SAVE_VIDEO':
        new SaveVideoEvent(data).action();
        break;
      case 'INIT_VIDEO':
        new LoadInitialVideoList().action();
        break;
      case 'CHANGE_VIDEO_STATUS':
        new ChangeVideoStatus(data).action();
        break;
    }
  }
}
