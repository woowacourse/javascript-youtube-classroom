import MainPage from './mainPage';
import SearchModal from './searchModal';

export default function initEventCatcher() {
  const mainPage = new MainPage();
  mainPage.init();
  const searchModal = new SearchModal();
}
