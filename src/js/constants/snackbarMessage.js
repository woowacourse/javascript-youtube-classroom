import { MAX_NUM_OF_SAVED_VIDEO } from './index.js';

export const SNACKBAR_MESSAGE = {
  OVER_MAX_NUM_OF_SAVED_VIDEO: `저장가능한 최대 영상 개수인 ${MAX_NUM_OF_SAVED_VIDEO}개를 초과했습니다.\n새로운 영상을 저장하려면 기존 영상을 삭제해주세요.`,
  DELETE_SUCCESS: '동영상을 성공적으로 삭제하였습니다.',
  SAVE_SUCCESS: '동영상을 성공적으로 저장하였습니다.',
  SAVE_FAILURE: '동영상을 저장하는데 실패하였습니다.',
  CHECK_VIDEO_SUCCESS: '해당 영상은 "본 영상" 탭에서 확인할 수 있습니다.',
  UNCHECK_VIDEO_SUCCESS: '해당 영상은 "볼 영상" 탭에서 확인할 수 있습니다.',
  API_REQUEST_FAILURE: '유튜브에서 정보를 불러오는데 실패하였습니다.',
};
