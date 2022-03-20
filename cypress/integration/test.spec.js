import {
  LOCAL_STORAGE_VIDEO_LIST_KEY,
  MAX_SAVABLE_VIDEOS_COUNT,
  SERVER_URL,
} from '../../src/js/constants/constant';
import VideoStorage from '../../src/js/storage/videoStorage';
import { hasProperty } from '../../src/js/utils';
import testid from '../support/utils/test-id';

describe('검색 모달을 열어 검색하고 동영상을 저장하는 프로세스를 테스트한다', () => {
  const storage = new VideoStorage(LOCAL_STORAGE_VIDEO_LIST_KEY, MAX_SAVABLE_VIDEOS_COUNT);

  before(() => {
    storage.clear();
    cy.visit('http://localhost:9000/');
  });

  after(() => {
    storage.clear();
  });

  it('검색 버튼을 눌렀을때 검색 모달이 뜬다', () => {
    cy.get(testid`open-search-modal-button`).click();
    cy.get(testid`search-modal`).should('be.visible');
  });

  it('검색어를 입력하고 검색 버튼을 누르면 동영상 리스트가 출력된다', () => {
    cy.fixture('youtube-videos').then(videos => {
      cy.intercept('GET', `${SERVER_URL}/dummy?*`, {
        statusCode: 200,
        body: videos,
      }).as('search-video');

      cy.get(testid`search-input`).type('anything');
      cy.get(testid`search-button`).click();

      cy.wait('@search-video')
        .its('response.body')
        .then(({ items }) => {
          cy.get(testid`search-result-video-item`).should('have.length', Math.min(items.length));
        });
    });
  });

  it('검색 결과에서 동영상 저장 버튼을 누르면 localStorage에 저장된다', () => {
    cy.fixture('youtube-videos').then(videos => {
      cy.get(testid`save-video-button`)
        .each($button => {
          cy.wrap($button).click();
        })
        .then(() => {
          const videoSet = storage.load({});
          const ids = videos.items.map(({ id }) => id.videoId);
          const isSame = ids.every(id => hasProperty(videoSet, id));
          expect(isSame).to.be.true;
        });
    });
  });
});
