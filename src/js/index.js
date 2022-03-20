import "../css/index";
import YoutubeMainApp from "./app/YoutubeMainApp";
import YoutubeModalApp from "./app/YoutubeModalApp";
import View from "./view/View";
import VideoStorage from "./VideoStorage";

(function main() {
  const videoStorage = new VideoStorage();
  const view = new View(videoStorage);
  new YoutubeMainApp(view, videoStorage);
  new YoutubeModalApp(view, videoStorage);
})();
