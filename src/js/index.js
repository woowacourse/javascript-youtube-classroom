import "../css/index";
import YoutubeMainApp from "./app/YoutubeMainApp";
import YoutubeModalApp from "./app/YoutubeModalApp";
import View from "./view/View";

(function main() {
  const view = new View();
  new YoutubeMainApp(view);
  new YoutubeModalApp(view);
})();
