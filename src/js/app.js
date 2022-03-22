import Storage from './Storage';
import SearchVideoManager from './Manager/SearchVideoManager';
import SaveVideoManager from './Manager/SaveVideoManager';
import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';

const storage = new Storage();
const searchVideoManager = new SearchVideoManager({ storage });
const saveVideoManager = new SaveVideoManager({ storage });

const homeView = new HomeView({ saveVideoManager });
const searchModalView = new SearchModalView({ searchVideoManager, saveVideoManager });

function initialize() {
  saveVideoManager.updateSavedVideos();
}

initialize();
