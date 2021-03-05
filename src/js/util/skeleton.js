const skeletonTemplate = `
  <div class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </div>
`;

export const renderSkeleton = ($target, repeatNumber) => {
  $target.innerHTML = skeletonTemplate.repeat(repeatNumber);
};

export const removeSkeleton = $target => {
  $target.querySelectorAll('.skeleton').forEach($skeleton => {
    $skeleton.remove();
  });
};
