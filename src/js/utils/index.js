export const $ = (selector, node = document) => node.querySelector(selector);

export const isEmpty = (value) => value === '';
