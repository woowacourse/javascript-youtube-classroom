import Navigation from './YoutubeClassRoom/Navigation';
import Modal from './Share/Modal';

export default class IndexDisplay {
  constructor() {
    new Modal();
    this.youtubeClassRoomPage();
  }

  youtubeClassRoomPage() {
    new Navigation();
  }
}
