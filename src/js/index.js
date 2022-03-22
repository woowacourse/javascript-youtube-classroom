import '../css/color.css';
import '../css/app.css';
import '../css/index.css';
import '../css/modal.css';
import '../css/mainView.css';

import EventHandler from './event/EventHandler.js';
import MainView from './view/MainView';
import ModalView from './view/ModalView';

const mainView = new MainView();
const modalView = new ModalView();

new EventHandler(mainView, modalView);
