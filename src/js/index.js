import App from './components/App.js';
import Store from './redux/store.js';
import reduce from './redux/reducer.js';
import { $ } from '../js/utils/utils.js';

export const store = new Store();

document.addEventListener('DOMContentLoaded', () => {
  const app = new App($('#app'));

  store.setup(app.states, reduce);
  app.run();
});
