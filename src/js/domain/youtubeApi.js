import 'regenerator-runtime';
import { MESSAGE } from '../constants';
import { skeleton } from '../ui/skeleton';

const request = async (searchText, nextPageToken = '') => {
  try {
    const response = await fetch(
      `https://mincho-youtube.netlify.app/youtube/v3/search?part=snippet&q=${searchText}&maxResults=10&type=video&pageToken=${nextPageToken}`,
    );
    if (response.ok) {
      const videoData = await response.json();
      return videoData;
    }
  } catch {
    skeleton.removeSkeletonUI();
    throw new Error(MESSAGE.ERROR_GET_REQUEST);
  }
};

export { request };