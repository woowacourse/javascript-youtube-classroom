import View from './view/View';
import Handler from './Handler';

const view = new View();

const handler = new Handler();

view.attachHandler(handler.searchHandler, handler.loadMoreHandler, handler.saveHandler);
