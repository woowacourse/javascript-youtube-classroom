import { renderLatestKeywordList } from '../../viewControllers/searchModal.js';
import { MAX_LATEST_KEYWORD_COUNT } from '../constants/classroom.js';

const latestKeywords = {
  value: [],

  init() {
    this.set(JSON.parse(localStorage.getItem('latestKeywords')) ?? []);
  },

  get() {
    return this.value;
  },

  set(newKeywords) {
    this.latestKeywords = newKeywords;

    renderLatestKeywordList(this.latestKeywords);
  },

  add(newKeyword) {
    const targetIdx = this.latestKeywords.indexOf(newKeyword);

    if (targetIdx > -1) {
      this.latestKeywords.splice(targetIdx, 1);
    } else if (this.latestKeywords.length === MAX_LATEST_KEYWORD_COUNT) {
      this.latestKeywords.shift();
    }
    this.latestKeywords.push(newKeyword);
    localStorage.setItem('latestKeywords', JSON.stringify(this.latestKeywords));

    renderLatestKeywordList(this.latestKeywords);
  },
};

export default latestKeywords;
