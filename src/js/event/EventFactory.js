import { EVENT_TYPE } from '../constant';
import { ChangeTab } from './ChangeTabEvent';
import ChangeVideoStatus from './ChangeVideoStatusEvent';
import DeleteVideo from './DeleteVideoEvent';
import LoadInitialVideoList from './LoadInitialVideoListEvent';
import SaveVideoEvent from './SaveVideoEvent';
import SearchVideoEvent from './SearchVideoEvent';

export default class EventFactory {
  static generate(name, data) {
    switch (name) {
      case EVENT_TYPE.SEARCH_VIDEO:
        new SearchVideoEvent(data).reaction();
        break;
      case EVENT_TYPE.SAVE_VIDEO:
        new SaveVideoEvent(data).reaction();
        break;
      case EVENT_TYPE.LOAD_INITIAL_VIDEO:
        new LoadInitialVideoList().reaction();
        break;
      case EVENT_TYPE.CHANGE_VIDEO_STATUS:
        new ChangeVideoStatus(data).reaction();
        break;
      case EVENT_TYPE.CHANGE_TAB:
        new ChangeTab(data).reaction();
        break;
      case EVENT_TYPE.DELETE_VIDEO:
        new DeleteVideo(data).reaction();
        break;
      default:
        alert('NO_EVENT');
    }
  }
}
