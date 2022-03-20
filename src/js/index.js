import '../css/index.css';
import '../assets/images/not_found.png';
import { initSavedVideos } from './handlers/manageVideo.js';
import bindEvents from './bindEvents.js';

export default function App() {
  initSavedVideos();
  bindEvents();
}

App();
