const element = function createCustomElement({ tag, className, id, children, props, dataset }) {
  const e = document.createElement(tag);
  Object.assign(e, className && { className }, id && { id }, props && { ...props });
  if (Array.isArray(children)) {
    e.append(...children);
    return e;
  }
  if (children) e.append(children);
  if (dataset) {
    Object.keys(dataset).forEach((data) => {
      e.dataset[data] = dataset[data];
    });
  }
  return e;
};

export default element;
