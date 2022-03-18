import { VIDEO } from './constants';

export const SKELETONS = `
  <div class="skeleton">
    <div class="image"></div>
    <h4 class="line"></h4>
     <p class="line"></p>
     <p class="line"></p>
    <button></button>
  </div>`.repeat(VIDEO.MAX_RESULT_PER_SEARCH);

export const EMPTY_MY_VIDEOS = `
  <label>
    저장된 영상이 없습니다!
    검색 버튼을 클릭하여
    보고 싶은 영상을 찾고 저장해 보세요 🙂
  </label>
`;
