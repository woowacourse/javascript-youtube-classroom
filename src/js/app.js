import View from './view/View';
import RequestSender from './RequestSender';
import Search from './domain/Search';

const view = new View();
const search = new Search();

const requestSender = new RequestSender(search);

view.attachRequestSender(
  requestSender.sendSearchRequest,
  requestSender.sendLoadMoreRequest,
  requestSender.sendSaveRequest
);
