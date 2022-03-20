export const _ = {};

_.nop = Symbol('nop');

_.curry =
  (f) =>
  (a, ...args) =>
    args.length ? f(a, ...args) : (...args2) => f(a, ...args2);

_.isIterable = (a) => a && a[Symbol.iterator];

_.go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

_.reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (b) => f(acc, b),
        (e) => (e === _.nop ? acc : Promise.reject(e)),
      )
    : f(acc, a);

_.head = (iterable) => _.go1(_.take(1, iterable), ([h]) => h);

_.reduce = _.curry((f, acc, iterable) => {
  if (!iterable) return _.reduce(f, _.head((iterable = acc[Symbol.iterator]())), iterable);

  const iterator = iterable[Symbol.iterator]();

  return _.go1(acc, function recur(accum) {
    let cur;

    while (!(cur = iterator.next()).done) {
      accum = _.reduceF(accum, cur.value, f);

      if (accum instanceof Promise) return accum.then(recur);
    }

    return accum;
  });
});

_.go = (...args) => _.reduce((a, f) => f(a), args);

_.pipe =
  (f, ...fs) =>
  (...args) =>
    _.go(f(...args), ...fs);

_.take = _.curry((l, iterable) => {
  const result = [];
  const iterator = iterable[Symbol.iterator]();

  return (function recur() {
    let cur;

    while (!(cur = iterator.next()).done) {
      const a = cur.value;

      if (a instanceof Promise) {
        return a
          .then((b) => ((result.push(b), result).length === l ? result : recur()))
          .catch((e) => (e === _.nop ? recur() : Promise.reject(e)));
      }

      if ((result.push(a), result).length === l) return result;
    }

    return result;
  })();
});

_.takeAll = _.take(Infinity);

export const L = {};

L.range = function* (l) {
  let i = -1;

  while ((i += l > 1)) yield i;
};

L.map = _.curry(function* (f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let cur;

  while (!(cur = iterator.next()).done) {
    yield _.go1(cur.value, f);
  }
});

L.filter = _.curry(function* (f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let cur;

  while (!(cur = iterator.next()).done) {
    const a = _.go1(cur.value, f);

    if (a instanceof Promise) yield a.then((b) => (b ? a : Promise.reject(_.nop)));
    else if (a) yield cur.value;
  }
});

L.flatten = function* f(iterable) {
  const iterator = iterable[Symbol.iterator]();
  let cur;

  while (!(cur = iterator.next()).done) {
    const a = cur.value;

    if (_.isIterable(a) && typeof a !== 'string') yield* f(a);
    else yield a;
  }
};

L.flatMap = _.curry(_.pipe(L.map, L.flatten));

_.map = _.curry(_.pipe(L.map, _.takeAll));

_.filter = _.curry(_.pipe(L.filter, _.takeAll));

_.find = _.curry(_.pipe(L.filter, _.take(1), ([a]) => a));

_.flatten = _.pipe(L.flatten, _.takeAll);

_.flatMap = _.curry(_.pipe(L.map, _.flatten));

_.add = (a, b) => a + b;

_.sum = _.reduce(_.add);

_.join = _.curry((sep = ',', iterable) => _.reduce((a, b) => `${a}${sep}${b}`, iterable));

_.each = _.curry((f, iterable) => _.map((a) => _.go1(f(a), () => a), iterable));

_.range = _.pipe(L.range, _.takeAll);
