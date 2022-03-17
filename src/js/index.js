import AppBusiness from './business';
import AppComponent from './components';
function runApp() {
  new AppBusiness();
  new AppComponent(document.querySelector('body'));
}
export default runApp;
