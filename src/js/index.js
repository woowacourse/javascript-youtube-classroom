import '../css/index.css';
import MyVideosScreen from './screen/myVideosScreen.js';
import SearchModalScreen from './screen/searchModalScreen.js';

const myVideosScreen = new MyVideosScreen();
new SearchModalScreen(myVideosScreen);
