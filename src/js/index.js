import SearchEventController from "./youtube-class-room/search/SearchEventController.js";
import WatchEventController from "./youtube-class-room/watch/WatchEventContorller.js";

function initApp() {
  const searchEventController = new SearchEventController();
  searchEventController.bindEvents();

  const watchEventController = new WatchEventController();
  watchEventController.bindEvents();
}

initApp();
