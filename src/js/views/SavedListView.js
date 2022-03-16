import Template from './Template.js';
import { $, $$ } from '../utils/dom.js';
import { emit } from '../utils/event.js';

export default class SearchResultView {
  constructor() {
    this.template = new Template();
  }
}
