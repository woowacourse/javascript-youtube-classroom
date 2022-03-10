export const isMissingProperty = (properties, object) =>
  properties.some((key) => object[key] === undefined);

export const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

export const isNoneSearchResult = (searchResult) =>
  searchResult.items.filter((item) => item.snippet).length === 0;
