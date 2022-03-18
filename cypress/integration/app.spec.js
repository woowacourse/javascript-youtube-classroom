import videoStore from '../../src/js/storage/videoStore';
import { SELECTOR } from '../../src/js/utils/constants';

describe('검색어를 입력하여 관련된 영상을 볼 수 있고, 저장하여 볼/본 영상으로 이동 및 삭제할 수 있다.', () => {
  before(() => {
    cy.visit('https://kamwoo.github.io/javascript-youtube-classroom/');
  });

  it('우테코를 검색하여 1개 이상의 관련된 영상을 보여줄 수 있다.', () => {
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();

    cy.get(SELECTOR.SEARCH_INPUT).type('우테코{enter}');
    cy.get(SELECTOR.VIDEO_LIST)
      .children()
      .then(list => {
        expect(list.length > 0);
      });
  });

  it('보여지는 영상들은 썸네일, 제목, 작성자, 작성요일을 가지고 있다.', () => {
    cy.get(SELECTOR.VIDEO_ITEM).children().eq(0).closest(SELECTOR.VIDEO_ITEM_THUMBNAIL);
    cy.get(SELECTOR.VIDEO_ITEM).children().eq(1).closest(SELECTOR.VIDEO_ITEM_TITLE);
    cy.get(SELECTOR.VIDEO_ITEM)
      .children()
      .eq(2)
      .closest(SELECTOR.VIDEO_ITEM_CHANNEL_NAGET_VIDEO_ITEM_TEMPLATEME);
    cy.get(SELECTOR.VIDEO_ITEM).children().eq(3).closest(SELECTOR.VIDEO_ITEM_PUBLISHED_DATE);
    cy.wait(4000);
  });

  it('비디오의 저장 버튼을 눌러 저장하고 저장된 비디오를 볼 영상 화면에서 보여줄 수 있다. 체크버튼을 누르면 본 화면으로 이동시킬 수 있다. 비디오에서 삭제 버튼을 클릭하면 저장된 비디오를 삭제할 수 있다.', () => {
    cy.get(SELECTOR.VIDEO_ITEM_SAVE_BUTTON)
      .click({ multiple: true })
      .then(() => {
        expect(localStorage.getItem(videoStore.KEY.STORED_VIDEO_LIST)).to.exist;
      });

    cy.get(SELECTOR.DIMMER).click({ force: true });

    cy.wait(2000);
    cy.get(SELECTOR.WILL_SEE_VIDEO_LIST)
      .children()
      .then(videoItemList => {
        expect(videoItemList).to.exist;
      });

    cy.wait(2000);
    cy.get(SELECTOR.CHECK_SAW_BUTTON).eq(0).click();
    cy.get(SELECTOR.SAW_BUTTON).click();
    cy.get(SELECTOR.SAW_VIDEO_LIST)
      .children()
      .then(videoItemList => {
        expect(videoItemList).to.exist;
      });

    cy.wait(2000);
    cy.get(SELECTOR.SAW_VIDEO_LIST).find(SELECTOR.DELETE_STORE_BUTTON).eq(0).click({
      multiple: true,
      force: true,
    });
    cy.get(SELECTOR.APP).find(SELECTOR.EMPTY_CONTAINER);
  });
});
