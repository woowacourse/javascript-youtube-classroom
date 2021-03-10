import elements from "./elements.js";

export function observeScrollBottom(handler) {
  const scrollBottomObserver = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        handler();
      }
    },
    {
      root: elements.$searchResults,
      threshold: 0.3,
    }
  );

  scrollBottomObserver.observe(elements.$hiddenTarget);
}
