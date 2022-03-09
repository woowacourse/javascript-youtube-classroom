import Video from '../modules/video';

describe('비디오 모듈 테스트', () => {
  test('비디오 생성할 수 있다.', () => {
    const givenVideoInput = {
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '승리자 빅터',
      publishTime: '12:30',
      thumbnail: '1.jpg',
    };
    const video = new Video(givenVideoInput);

    const videoInfo = video.getVideoInfo();
    expect(videoInfo).toEqual(givenVideoInput);
  });

  test('비디오 생성할 수 없다.', () => {});
});
