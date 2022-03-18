import SearchVideoEvent from './SearchVideoEvent';

export default class EventFactory {
  static generate(name, data) {
    switch (name) {
      case 'SEARCH_VIDEO':
        new SearchVideoEvent(data).action();
    }
  }
}
