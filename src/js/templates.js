import { VIDEO } from './constants';

const SKELETONS = `
  <div class="skeleton">
    <div class="image"></div>
    <h4 class="line"></h4>
     <p class="line"></p>
     <p class="line"></p>
    <button></button>
  </div>`.repeat(VIDEO.MAX_RESULT_PER_SEARCH);

export default SKELETONS;
