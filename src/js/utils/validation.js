export const isMissingProperty = (properties, object) =>
  properties.some((key) => object[key] === undefined);

export const isEmptyKeyword = (keyword) => keyword.trim().length === 0;
