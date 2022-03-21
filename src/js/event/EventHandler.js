import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';
import validator from '../utils/validator.js';
import { CONFIRM_MESSAGE, DOM_STRING } from '../utils/constants.js';
import videoApiCaller from '../api/videoApiCaller.js';
import videoStore from '../storage/videoStore.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindEvents();
    this.mainView.clickWillSeeButton();
  }

  setBindEvents() {
    this.mainView.bindModalOpenButton(this.onModalOpenButtonClick.bind(this));
    this.mainView.bindStoreTypeButtons(this.onStoreTypeButtonsClick.bind(this));
    this.mainView.bindVideoItemButtons(this.onVideoItemButtonsClick.bind(this));

    this.modalView.bindOnClickSearchButton(this.onSearchButtonClick.bind(this));
    this.modalView.bindOnClickClose(this.onDimmerClose.bind(this));
    this.modalView.bindVideoListScroll(this.onVideoListScroll.bind(this));
    this.modalView.bindVideoListClickStoreButton(this.onStoreButtonClick.bind(this));
  }

  onModalOpenButtonClick() {
    this.modalView.showModal();
  }

  onDimmerClose() {
    this.modalView.hideModal();
    this.onStoreTypeButtonsClick(this.mainView.getCurrentStoreType());
  }

  onStoreButtonClick(videoId) {
    try {
      videoStore.storeVideoWithVideoId(videoId);
    } catch (error) {
      alert(error.message);
    }
  }

  async onSearchButtonClick(inputValue) {
    try {
      validator.checkSearchInput(inputValue);
      this.modalView.resetVideoList();
      this.modalView.showLoadingVideoItems();
      const videoListData = await videoApiCaller.getSearchVideoListData(inputValue);

      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
    } catch (error) {
      this.modalView.showNoResult();
      alert(error.message);
    }
  }

  async onVideoListScroll(inputValue) {
    try {
      this.modalView.showLoadingVideoItems();
      const videoListData = await videoApiCaller.getSearchVideoListData(inputValue);

      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
      videoListData[0].isLastPage && confirm(CONFIRM_MESSAGE.NOTHING_MORE);
    } catch (error) {
      alert(error.message);
    }
  }

  onStoreTypeButtonsClick(storeType) {
    const videoList = videoStore.getVideoListWith(storeType);
    if (videoList.length === 0) {
      this.mainView.showEmptyStorage(true);
      return;
    }

    this.mainView.showEmptyStorage(false);
    this.showStoredVideoItems(videoList);
  }

  async showStoredVideoItems(videoList) {
    const videoIdList = videoList.map(video => video.id);
    const renderedVideoIdList = this.mainView.getRenderedVideoIdList();
    const willRequestVideoIdList = videoIdList.filter(id => !renderedVideoIdList.includes(id));
    if (willRequestVideoIdList.length === 0) {
      return;
    }

    this.mainView.showSkeletonVideoList(willRequestVideoIdList);
    const videoData = await videoApiCaller.getStoreVideoListData(willRequestVideoIdList);
    this.mainView.updateVideoItems(videoData);
  }

  onVideoItemButtonsClick(buttonId, videoId, storeType) {
    switch (buttonId) {
      case DOM_STRING.CHECK_WILL_SEE_BUTTON:
        videoStore.changeVideoStoreType(videoId, storeType);
        break;
      case DOM_STRING.CHECK_SAW_BUTTON:
        videoStore.changeVideoStoreType(videoId, storeType);
        break;
      case DOM_STRING.DELETE_STORE_BUTTON:
        if (confirm(CONFIRM_MESSAGE.DELETE_STORED_VIDEO)) {
          videoStore.deleteVideoWithId(videoId);
          this.onStoreTypeButtonsClick(this.mainView.getCurrentStoreType());
        }
    }
  }
}
