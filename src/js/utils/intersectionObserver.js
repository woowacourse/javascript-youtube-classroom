export default class observeIntersection {
  // const that = this;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        handler();
        // that.#scrollNextVideos();
        console.log('무한스크롤중');
      } else console.log('Not on the bottom');
    },
    {
      root: this.searchResultView.$videoList,
      threshold: 1, // Trigger only when whole element was visible
    },
  );
  console.log(this.searchResultView.$videoList.lastElementChild);

  observer.observe(this.searchResultView.$videoList.lastElementChild);
};
