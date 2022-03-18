import "../css/index";
import YoutubeMainApp from "./app/YoutubeMainApp";
import YoutubeModalApp from "./app/YoutubeModalApp";
import Render from "./view/Render";

(function main() {
  const render = new Render();
  new YoutubeMainApp(render);
  new YoutubeModalApp(render);
})();
