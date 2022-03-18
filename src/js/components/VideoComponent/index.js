import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
import { canLoadImage, hasNotSrcAttribute } from '../../utils/validation';
class VideoComponent {
  parentElement = null;

  componentType = VIDEO_COMPONENT_TYPE.SEARCH;

  $videoItem = null;

  $videoImg = null;

  constructor(parentElement, { type = VIDEO_COMPONENT_TYPE.SEARCH, ...restProps }) {
    this.parentElement = parentElement;
    this.componentType = type;
    this.props = restProps;
  }

  loadImg(showingCutline) {
    const { top } = this.$videoImg.getBoundingClientRect();

    if (canLoadImage(top, showingCutline) && hasNotSrcAttribute(this.$videoImg)) {
      const {
        dataset: { src },
      } = this.$videoImg;

      this.$videoImg.src = src;
    }
  }
}

export default VideoComponent;
