import View from './view/View';

import Search from './domain/Search';
import storage from './domain/storage';

const search = new Search();
// eslint-disable-next-line
const view = new View(search, storage.saveVideos);
