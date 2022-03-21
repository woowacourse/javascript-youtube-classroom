import '../css/index.css';
import RenderSaveVideo from './renderSaveVideo';
import RenderSearchVideo from './renderSearchVideo';
import SaveVideo from './saveVideo';
import SearchVideo from './searchVideo';

const searchVideo = new SearchVideo();
const saveVideo = new SaveVideo();

new RenderSaveVideo(saveVideo);
new RenderSearchVideo(searchVideo, saveVideo);
