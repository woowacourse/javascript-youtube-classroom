export default function lazyLoading() {
  const options = { threshold: 1.0 };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector('#modal-videos'));

  const modalClips = document.querySelectorAll('#modal-videos iframe');
  modalClips.forEach((clip) => {
    observer.observe(clip);
  });
}
