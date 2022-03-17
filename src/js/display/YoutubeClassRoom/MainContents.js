import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE, UI_ACTION, PAGE_NAME } from '@Constants';
import UIStore from '@Domain/UIStore';

export default class MainContents {
  constructor() {
    this.container = $('#main-contents');
    UIStore.addSubscriber(this.render, ['selectedPage']);
  }

  render = ({ selectedPage }) => {};
}
