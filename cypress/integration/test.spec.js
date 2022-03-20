/* eslint-disable prettier/prettier */
import {
  LOCAL_STORAGE_VIDEO_LIST_KEY,
  MAX_SAVABLE_VIDEOS_COUNT,
  SERVER_URL,
} from '../../src/js/constants/constant';
import VideoStorage from '../../src/js/storage/videoStorage';
import { hasProperty } from '../../src/js/utils';
import testid from '../support/utils/test-id';

const storage = new VideoStorage(LOCAL_STORAGE_VIDEO_LIST_KEY, MAX_SAVABLE_VIDEOS_COUNT);

describe('검색 모달을 열어 검색하고 동영상을 저장하는 프로세스를 테스트한다', () => {
  before(() => {
    storage.clear();
    cy.visit('http://localhost:9000/');
  });

  after(() => {
    // storage.clear();
    cy.saveLocalStorage();
  });

  it('검색 버튼을 눌렀을때 검색 모달이 뜬다', () => {
    cy.get(testid`open-search-modal-button`).click();
    cy.get(testid`search-modal`).should('be.visible');
  });

  it('검색어를 입력하고 검색 버튼을 누르면 동영상 리스트가 출력된다', () => {
    cy.fixture('youtube-search-results').then(videos => {
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
    cy.fixture('youtube-search-results').then(videos => {
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

describe('저장된 동영상을 필터링한다', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', `${SERVER_URL}/youtube-videos?*`, {
      fixture: 'youtube-video-results',
    }).as('request-video');
    cy.visit('http://localhost:9000/');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('필터가 안걸려 있는 경우 메인 페이지에 보이는 동영상 리스트가 localStorage에 저장된 동영상 리스트와 일치한다', () => {
    cy.wait('@request-video');

    const videoSet = storage.load();

    // 개수가 일치해야한다
    cy.get(testid`saved-video-item`).should('have.length', Object.keys(videoSet).length);

    // id값이 일치해야한다
    cy.get(testid`saved-video-item`).each($videoItem => {
      const id = $videoItem.attr('data-video-id');
      const isInSavedVideoSet = hasProperty(videoSet, id);
      expect(isInSavedVideoSet).to.be.true;
    });
  });

  it('영상의 상태를 변경했을때 버튼의 황성 상태가 바뀌고 localStorage에도 반영된다', () => {
    // active로 변경 되는지 확인한다
    cy.get(`${testid`video-status-change-button`}:not(.active)`)
      .first()
      .as('button');
    cy.get('@button').click();
    cy.get('@button').should('have.class', 'active');

    // localStorage에 제대로 반영이 되는지 확인한다
    cy.get('@button')
      .closest(testid`saved-video-item`)
      .invoke('attr', 'data-video-id')
      .then(id => {
        const videoSet = storage.load();
        expect(videoSet[id].watched).to.be.true;
      });
  });

  it('"볼 영상"으로 필터가 걸려있는 경우 영상의 상태를 "본 영상"으로 변경하면 "볼 영상" 리스트에서 사라지고 "본 영상" 리스트에 나타난다', () => {
    // 볼 영상으로 필터링 한다
    cy.get(testid`filter-for-watch-later-video`).click();

    // active가 아닌, 즉 "볼 영상"에 속하는 영상의 상태 변경 버튼을 의미한다
    cy.get(`${testid`video-status-change-button`}:not(.active)`)
      .first()
      .as('button');
    cy.get('@button').click();

    // 볼 영상 리스트에서 안보이게 된다
    cy.get('@button').closest(testid`saved-video-item`).should('have.css', 'display', 'none');

    // 본 영상 리스트에서 보이게 된다
    cy.get(testid`filter-for-watched-video`).click();
    cy.get('@button').closest(testid`saved-video-item`).should('not.have.css', 'display', 'none');
  });

  it('"본 영상"으로 필터가 걸려있는 경우 영상의 상태를 "볼 영상"으로 변경하면 "본 영상" 리스트에서 사라지고 "볼 영상" 리스트에 나타난다', () => {
    // 본 영상으로 필터링 한다
    cy.get(testid`filter-for-watched-video`).click();

    // active인, 즉 "본 영상"에 속하는 영상의 상태 변경 버튼을 의미한다
    cy.get(`${testid`video-status-change-button`}.active`)
      .first()
      .as('button');
    cy.get('@button').click();

    // 볼 영상 리스트에서 보이게 된다
    cy.get(testid`filter-for-watch-later-video`).click();
    cy.get('@button').closest(testid`saved-video-item`).should('not.have.css', 'display', 'none');
  });
});
