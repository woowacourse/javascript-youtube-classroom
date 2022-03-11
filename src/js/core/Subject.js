export default class Subject {
  static #private = Symbol('subject checker');

  static currentObserver;

  static observable(obj) {
    const subjects = {};

    Object.keys(obj).forEach((key) => {
      const subject = new Subject(obj[key], Subject.#private);

      Object.defineProperty(subjects, key, {
        get() {
          return subject.getState();
        },
        set(value) {
          subject.setState(value);
        },
      });
    });

    Object.seal(subjects);

    return subjects;
  }

  #observers = new Set();

  #updated = false;

  constructor(initState, checker) {
    if (checker !== Subject.#private)
      throw new Error('use Subject.observable()');

    this.state = initState;

    Object.seal(this);
  }

  getState() {
    if (Subject.currentObserver) this.register(Subject.currentObserver);

    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.#updated = true;
    this.notify();
  }

  register(observer) {
    this.#observers.add(observer);
  }

  unregister(observer) {
    this.#observers.delete(observer);
  }

  notify() {
    if (this.#updated) {
      this.#observers.forEach((observer) => {
        observer.notify();
      });
    }

    this.#updated = false;
  }
}
