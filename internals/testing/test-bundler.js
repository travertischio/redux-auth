// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

window.localStorage = localStorageMock;
