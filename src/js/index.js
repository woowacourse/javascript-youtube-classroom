import SearchEventController from "./youtube-class-room/search/SearchEventController.js";
import WatchEventController from "./youtube-class-room/watch/WatchEventContorller.js";

function initApp() {
  const searchEventController = new SearchEventController();
  const watchEventController = new WatchEventController();

  searchEventController.bindEvents();
  watchEventController.bindEvents();
}

initApp();
