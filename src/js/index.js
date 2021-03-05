import App from './components/App.js';
import Store from './redux/store.js';
import reduce from './redux/reducer.js';

export const store = new Store();

document.addEventListener('DOMContentLoaded', () => {
  const app = new App(document.querySelector('#app'));

  store.setup(app.states, reduce);
  app.run();
});
