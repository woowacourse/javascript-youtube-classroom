import { globalStore } from '../store/VideoStore';

export default class ChangeVideoStatus {
  constructor(data) {
    this.data = data;
  }

  action() {
    this.data.target.closest('li').remove();
    globalStore.toggleState(this.data.id);
    globalStore.toggleWatchedToStarge(this.data.id);
  }
}
