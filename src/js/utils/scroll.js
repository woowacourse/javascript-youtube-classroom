const SCROLL_OFFSET = 50;

export const isEndOfScroll = element =>
  element.scrollTop + element.clientHeight >= element.scrollHeight - SCROLL_OFFSET;
