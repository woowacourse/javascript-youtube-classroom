import { EVENT_TYPE } from '../constant';
import { ChangeTab } from './ChangeTab';
import ChangeVideoStatus from './ChangeVideoStatus';
import DeleteVideo from './DeleteVideo';
import LoadInitialVideoList from './LoadInitialVideoList';
import SaveVideoEvent from './SaveVideoEvent';
import SearchVideoEvent from './SearchVideoEvent';

export default class EventFactory {
  static generate(name, data) {
    switch (name) {
      case EVENT_TYPE.SEARCH_VIDEO:
        new SearchVideoEvent(data).action();
        break;
      case EVENT_TYPE.SAVE_VIDEO:
        new SaveVideoEvent(data).action();
        break;
      case EVENT_TYPE.LOAD_INITIAL_VIDEO:
        new LoadInitialVideoList().action();
        break;
      case EVENT_TYPE.CHANGE_VIDEO_STATUS:
        new ChangeVideoStatus(data).action();
        break;
      case EVENT_TYPE.CHANGE_TAB:
        new ChangeTab(data).action();
        break;
      case EVENT_TYPE.DELETE_VIDEO:
        new DeleteVideo(data).action();
        break;
      default:
        alert('NO_EVENT');
    }
  }
}
