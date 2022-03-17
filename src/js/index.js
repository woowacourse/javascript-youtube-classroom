import SaveInterferer from './interferer/saveInterferer';
import SearchInterferer from './interferer/searchInterferer';

const saveInterferer = new SaveInterferer();
const searchInterferer = new SearchInterferer();

saveInterferer.init();
searchInterferer.init();
