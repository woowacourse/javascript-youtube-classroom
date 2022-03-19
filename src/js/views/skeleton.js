/* eslint-disable max-lines-per-function */
export const renderSkeletonItems = (videoCount, htmlElement) => {
  const skeletonListHtmlString = [...Array(videoCount).keys()]
    .map(
      () => `
        <div class="skeleton">
          <div class="image"></div>
          <p class="line"></p>
          <p class="line"></p>
        </div>
      `
    )
    .join('');

  htmlElement.insertAdjacentHTML('beforeend', skeletonListHtmlString);
};

export const removeSkeleton = htmlElement => {
  [...htmlElement.querySelectorAll('.skeleton')].forEach($el => $el.remove());
};
