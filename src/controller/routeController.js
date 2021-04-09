import { BROWSER_HASH, EMPTY } from '../constants.js';
import { savedVideoFilter } from '../store.js';
import savedVideoController from './savedVideoController.js';
import controllerUtil from './controllerUtil.js';
import { layoutView } from '../view/index.js';
import filteredVideoService from '../service/filteredVideoService.js';

const routeController = {
  initRouteEventListeners() {
    window.onhashchange = routeByHash;
    window.onload = routeByHash;
  },
};

function routeByHash() {
  const hash = controllerUtil.parseHash(location.hash);
  layoutView.highlightNavButton(hash);
  if (hash === BROWSER_HASH.WATCHING || hash === EMPTY) {
    savedVideoFilter.setNotCheckedOnly();
  }
  if (hash === BROWSER_HASH.WATCHED) {
    savedVideoFilter.setCheckedOnly();
  }
  filteredVideoService.initVideoSliceIndex();
  savedVideoController.renderFilteredVideos();
}

export default routeController;
