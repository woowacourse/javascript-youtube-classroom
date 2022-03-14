export default function mockObject() {
  return [...Array(10).keys()].map((index) => ({
    id: {
      videoId: index,
    },
    snippet: {
      channelTitle: "essential;",
      thumbnails: {
        high: {
          url: "https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ",
        },
      },
      publishTime: "2022-03-02T11:39:31Z",
      title: "[Playlist] 너무 좋은데 괜찮으시겠어요?",
    },
  }));
}
