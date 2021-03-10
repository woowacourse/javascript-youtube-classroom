export default function getSkeletonUITemplate(repeatNumber) {
  return `
    <li class="clip">
      <article class="mt-10">
        <div class="preview-container">
          <div class="skeleton image"></div>
        </div>
        <div class="content-container mt-2">
          <div class="skeleton line"></div>
          <div>
            <div class="skeleton short-line mt-1"></div>
            <div class="skeleton short-line mt-1"></div>
            <div class="d-flex justify-end">
              <div class="skeleton skeleton-btn mt-1"></div>
            </div>
          </div>
        </div>
      </article>
    </li>`.repeat(repeatNumber);
}
