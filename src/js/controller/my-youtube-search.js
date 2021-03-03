class MyYoutubeSearchController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  getVideosBySearch = async () => {
    await this.model.getVideoInfosBySearch({ query: '메이커준' });
    this.view.renderVideoArticles(this.model.videoInfos);
  };
}

export default MyYoutubeSearchController;
