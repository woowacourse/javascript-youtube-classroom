export default function getSkeletonClipTemplate() {
  const skeletonArticle = document.createElement("article");
  skeletonArticle.classList.add("clip");
  skeletonArticle.classList.add("mt-10");
  skeletonArticle.innerHTML = `
    <div class="preview-container">
        <div class="skeleton image"></div>
      </div>
      <div class="content-container pt-2 px-1">
        <div class="skeleton line"></div>
        <div>
          <div class="skeleton short-line"><div>
          <div class="skeleton short-line"><div>
          <div class="d-flex justify-end">
            <div class="skeleton skeleton-btn"></div>
          </div>
      </div>
    </div>`;
}
