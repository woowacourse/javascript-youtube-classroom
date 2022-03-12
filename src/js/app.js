
import Storage from './Storage';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';

const storage = new Storage();

const searchVideoManager = new SearchVideoManager(storage);
const saveVideoManager = new SaveVideoManager(storage);

const homeView = new HomeView();
const searchModalView = new SearchModalView();
