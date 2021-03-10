import { LOCAL_STORAGE_KEY } from '../../src/js/utils/constant.js';
import storage from '../../src/js/utils/localStorage.js';

const dummy = [
  {
    kind: 'youtube#searchResult',
    etag: 'RBehj5n2VFyOaJYVu0unNB4cfUw',
    id: { kind: 'youtube#video', videoId: 'gh8D550NlRc' },
    snippet: {
      publishedAt: '2020-07-17T05:32:45Z',
      channelId: 'UC-mOekGSesms0agFntnQang',
      title: '[우테코 :클래퍼:vlog] Ep.1 앨런의 하루 :화창:',
      description:
        '[우테코로그] Ep.1 앨런의 하루 :화창: 우테코 vlog의 첫 번째 주자는 앨런입니다. 아침부터 저녁까지 이어지는 우테코의 생활을 vlog를 통해 보여준다고 하는데요 : ) 앨런 ...',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/gh8D550NlRc/default.jpg',
          width: 120,
          height: 90,
        },
        medium: {
          url: 'https://i.ytimg.com/vi/gh8D550NlRc/mqdefault.jpg',
          width: 320,
          height: 180,
        },
        high: {
          url: 'https://i.ytimg.com/vi/gh8D550NlRc/hqdefault.jpg',
          width: 480,
          height: 360,
        },
      },
      channelTitle: '우아한Tech',
      liveBroadcastContent: 'none',
      publishTime: '2020-07-17T05:32:45Z',
    },
    isWatched: false,
  },
  {
    kind: 'youtube#searchResult',
    etag: 'MmtwleyVNxC5jEvhdtnmaZJvIf0',
    id: { kind: 'youtube#video', videoId: '9cyAqCdtews' },
    snippet: {
      publishedAt: '2020-10-15T19:15:41Z',
      channelId: 'UCGmYJSYFM19VgwEQJsY12Dg',
      title: '우아한테크코스 3기 온라인 설명회',
      description: '',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/9cyAqCdtews/default.jpg',
          width: 120,
          height: 90,
        },
        medium: {
          url: 'https://i.ytimg.com/vi/9cyAqCdtews/mqdefault.jpg',
          width: 320,
          height: 180,
        },
        high: {
          url: 'https://i.ytimg.com/vi/9cyAqCdtews/hqdefault.jpg',
          width: 480,
          height: 360,
        },
      },
      channelTitle: '박재성',
      liveBroadcastContent: 'none',
      publishTime: '2020-10-15T19:15:41Z',
    },
    isWatched: true,
  },
  {
    kind: 'youtube#searchResult',
    etag: 'XRlfQhdntzog1Xq987q0PffIezc',
    id: { kind: 'youtube#video', videoId: 'fY96DI4x9nA' },
    snippet: {
      publishedAt: '2016-10-20T21:56:17Z',
      channelId: 'UCHuza_p8LoPHvsAgnFYLH5w',
      title: 'Voices of Adults with ASD 2016',
      description: '',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/fY96DI4x9nA/default.jpg',
          width: 120,
          height: 90,
        },
        medium: {
          url: 'https://i.ytimg.com/vi/fY96DI4x9nA/mqdefault.jpg',
          width: 320,
          height: 180,
        },
        high: {
          url: 'https://i.ytimg.com/vi/fY96DI4x9nA/hqdefault.jpg',
          width: 480,
          height: 360,
        },
      },
      channelTitle: 'University of Colorado Anschutz Medical Campus',
      liveBroadcastContent: 'none',
      publishTime: '2016-10-20T21:56:17Z',
    },
  },
  {
    kind: 'youtube#searchResult',
    etag: 'epiN4rMQsrNB7k9yf9j1bIfgcD8',
    id: { kind: 'youtube#video', videoId: '6wQ2cNaHi9c' },
    snippet: {
      publishedAt: '2021-03-08T11:23:33Z',
      channelId: 'UCFdBehO71GQaIom4WfVeGSw',
      title: 'アスペルガー症候群・ASDの8つのメリットとは【前前前半】',
      description:
        '今ならDラボが20日間無料⬇️ 続きは ASDの持つ8つの特殊能力〜ASD(アスペルガー症、自閉症スペクトラム)という進化の秘密 動画は ...',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/6wQ2cNaHi9c/default_live.jpg',
          width: 120,
          height: 90,
        },
        medium: {
          url: 'https://i.ytimg.com/vi/6wQ2cNaHi9c/mqdefault_live.jpg',
          width: 320,
          height: 180,
        },
        high: {
          url: 'https://i.ytimg.com/vi/6wQ2cNaHi9c/hqdefault_live.jpg',
          width: 480,
          height: 360,
        },
      },
      channelTitle: 'メンタリスト DaiGo',
      liveBroadcastContent: 'upcoming',
      publishTime: '2021-03-08T11:23:33Z',
    },
  },
];

export const setLocalDummy = () => {
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, dummy);
};
