import SaveInterferer from './interferer/saveInterferer';
import ModalInterferer from './interferer/modalInterferer';
import MainInterferer from './interferer/mainInterferer';

const saveInterferer = new SaveInterferer();
const modalInterferer = new ModalInterferer();
const mainInterferer = new MainInterferer();

saveInterferer.init();
modalInterferer.init();
mainInterferer.init();
