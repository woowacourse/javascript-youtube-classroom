import VideoContainerComponent from './components/VideoContainerComponent';
import Video from './modules/video';
const app = document.querySelector('#app');

const videoContainerComponent = new VideoContainerComponent(app, {
  videoList: [
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),

    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
  ],
});

videoContainerComponent.setState({
  ...videoContainerComponent.state,
  videoList: [
    ...videoContainerComponent.state.videoList,
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
    Video.create({
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '무비비빅터',
      publishTime: '2016-03-01',
      thumbnail: '1.jpg',
    }),
  ],
});
