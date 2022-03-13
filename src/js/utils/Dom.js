export const createElement = (tagName, property = {}) => {
  const $create = document.createElement(tagName);
  Object.entries(property).forEach(([key, value]) => {
    if (key === 'dataset') {
      Object.entries(value).forEach(([datasetId, datasetValue]) =>
        $create.setAttribute(`data-${datasetId}`, datasetValue),
      );
    }
    if (typeof $create[key] === 'string') {
      $create[key] = value;
    }

    if (typeof $create[key] === 'function') {
      $create[key](...value);
    }
  });

  return $create;
};

export const combineElement = elements => {
  const $fragment = document.createDocumentFragment();
  $fragment.append(...elements);

  return $fragment;
};

export const $ = (selector, parentElement = document) => parentElement.querySelector(selector);

export const $$ = (selector, parentElement = document) => parentElement.querySelectorAll(selector);
