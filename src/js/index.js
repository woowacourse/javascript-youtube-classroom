import SaveInterferer from './interferer/saveInterferer';
import ModalInterferer from './interferer/modalInterferer';
import MainInterferer from './interferer/mainInterferer';

const mainInterferer = new MainInterferer();
const saveInterferer = new SaveInterferer(mainInterferer);
const modalInterferer = new ModalInterferer();

saveInterferer.init();
modalInterferer.init();
mainInterferer.loadSavedItemsPage();
