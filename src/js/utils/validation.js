export const isMissingProperty = (properties, object) =>
  properties.some((key) => object[key] === undefined);
