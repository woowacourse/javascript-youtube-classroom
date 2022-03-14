import AppBusiness from './business';
import AppComponent from './components';

const appComponent = new AppComponent(document.querySelector('body'));
const appBusiness = new AppBusiness();

export default { appComponent, appBusiness };
