function createSkeletonClipTemplate() {
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

function createVideoSkeletonTemplate() {
  return `<div class="video-wrapper">
            ${createSkeletonClipTemplate().repeat(10)}
          </div>`;
}

export default createVideoSkeletonTemplate;
