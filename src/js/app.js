
import Storage from './Storage';
import SearchVideoManager from './Manager/SearchVideoManager';
import SaveVideoManager from './Manager/SaveVideoManager';
import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';


const homeView = new HomeView();
const searchModalView = new SearchModalView();

const storage = new Storage();

const searchVideoManager = new SearchVideoManager(storage);
const saveVideoManager = new SaveVideoManager(storage);

