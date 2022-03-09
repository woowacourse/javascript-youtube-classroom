import EventHandler from './event/EventHandler.js';
import APIManger from './managers/APIManager.js';

export default class App {
  init() {
    this.EventHandler = new EventHandler();
    APIManger.fetchData('우테코');
  }
}
