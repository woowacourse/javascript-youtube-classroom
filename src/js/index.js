import '../css/index.css';
import RenderVideo from './renderVideo.js';
import SaveVideo from './saveVideo.js';
import SearchVideo from './searchVideo.js';

function startYoutude() {
  const searchVideo = new SearchVideo();
  const saveVideo = new SaveVideo();

  new RenderVideo(searchVideo, saveVideo);
}

document.addEventListener('DOMContentLoaded', startYoutude);
