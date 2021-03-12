import { FETCH_VIDEO_COUNT } from '../constants/classroom.js';

function skeletonClipTemplate() {
  return `<article class="clip skeleton">
            <div class="preview-container image">
              <div ></div>
            </div>
            <div class="content-container pt-2">
              <div>
                <div class="meta line">
                  <p></p>
                </div>
                <div class="d-flex justify-end line mt-3"></div>
              </div>
            </div>
          </article>`;
}

function videoSkeletonTemplate() {
  return skeletonClipTemplate().repeat(FETCH_VIDEO_COUNT);
}

export default videoSkeletonTemplate;
