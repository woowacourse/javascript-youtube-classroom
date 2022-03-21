import '../css/index.css';
import ControlVideo from './controlVideo';
import RenderVideo from './renderVideo.js';
import SearchVideo from './searchVideo.js';

function startYoutude() {
  const searchVideo = new SearchVideo();
  const controlVideo = new ControlVideo();

  new RenderVideo(searchVideo, controlVideo);
}

document.addEventListener('DOMContentLoaded', startYoutude);
