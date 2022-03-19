import View from './view/View';
import Search from './domain/Search';
import MainView from './view/MainView';

const search = new Search();
const mainView = new MainView();
new View(search, mainView);
