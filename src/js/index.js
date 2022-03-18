import '../css/index.css';
import RenderVideo from './renderVideo.js';
import SearchVideo from './searchVideo.js';

function startYoutude() {
  const searchVideo = new SearchVideo();

  new RenderVideo(searchVideo);
}

document.addEventListener('DOMContentLoaded', startYoutude);
