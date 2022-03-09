import '../css/index.css';
import SearchEngine from './searchEngine.js';
import StorageEngine from './storageEngine.js';

console.log(
  new SearchEngine().searchKeyword('지피티').then((data) => {
    new StorageEngine().saveData(data);
  })
);
