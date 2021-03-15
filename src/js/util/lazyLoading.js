import { $$ } from './index.js';

export const setLazyLoading = () => {
  const lazyLoadIframes = $$('.lazy');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('lazy');
        const image = entry.target;
        image.src = image.dataset.src;
        imageObserver.unobserve(image);
      }
    });
  });

  lazyLoadIframes.forEach(image => {
    imageObserver.observe(image);
  });
};
