const element = function createCustomElement({ tag, className, id, children, props }) {
  const e = document.createElement(tag);
  Object.assign(e, className && { className }, id && { id }, props && { ...props });
  if (Array.isArray(children)) {
    e.append(...children);
    return e;
  }
  if (children) e.append(children);
  return e;
};

export default element;
