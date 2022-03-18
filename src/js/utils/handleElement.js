import { CLASSNAME } from '../constants/contants';

const selectDom = (element, parent = document) => parent.querySelector(element);
const addEvent = (element, eventName, callback) => element.addEventListener(eventName, callback);
const insertHtmlToElement = (element, position, insertHtmlString) =>
  element.insertAdjacentHTML(position, insertHtmlString);
const hideElement = ({ classList: elementClassList }, isHidden = true) =>
  isHidden
    ? elementClassList.add(CLASSNAME.HIDE_ELEMENT)
    : elementClassList.remove(CLASSNAME.HIDE_ELEMENT);

export { selectDom, addEvent, insertHtmlToElement, hideElement };
