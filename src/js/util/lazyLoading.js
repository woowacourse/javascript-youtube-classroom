export const setLazyLoading = elements => {
  const lazyLoadingElements = elements.querySelectorAll('[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
        imageObserver.unobserve(image);
      }
    });
  });

  lazyLoadingElements.forEach(image => {
    imageObserver.observe(image);
  });
};
