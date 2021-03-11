import SearchEventController from "./search/SearchEventController.js";
import WatchEventController from "./watch/WatchEventContorller.js";

const searchEventController = new SearchEventController();
searchEventController.bindEvents();

const watchEventController = new WatchEventController();
watchEventController.bindEvents();
