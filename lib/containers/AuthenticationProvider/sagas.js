'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.setTokenSaga = setTokenSaga;
exports.putRefreshTokenActionWithDelaySaga = putRefreshTokenActionWithDelaySaga;
exports.clearTokenSaga = clearTokenSaga;
exports.refreshTokenSaga = refreshTokenSaga;
exports.setTokenIfExistsSaga = setTokenIfExistsSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

var _actions = require('./actions');

var _selectors = require('./selectors');

var _api = require('../../api');

var _constants = require('./constants');

var _marked = [defaultSaga, setTokenSaga, putRefreshTokenActionWithDelaySaga, clearTokenSaga, refreshTokenSaga, setTokenIfExistsSaga].map(regeneratorRuntime.mark);

function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeEvery)(_constants.SET_TOKEN_ACTION, setTokenSaga);

        case 2:
          _context.next = 4;
          return (0, _reduxSaga.takeEvery)(_constants.SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga);

        case 4:
          _context.next = 6;
          return (0, _reduxSaga.takeEvery)(_constants.CLEAR_TOKEN_ACTION, clearTokenSaga);

        case 6:
          _context.next = 8;
          return (0, _reduxSaga.takeEvery)(_constants.REFRESH_TOKEN_ACTION, refreshTokenSaga);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function setTokenSaga(action) {
  var token;
  return regeneratorRuntime.wrap(function setTokenSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = action.payload;
          _context2.next = 3;
          return (0, _effects.call)(_utils.setTokenInStorage, token);

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function putRefreshTokenActionWithDelaySaga() {
  var tokenExpiryTime;
  return regeneratorRuntime.wrap(function putRefreshTokenActionWithDelaySaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.select)(_selectors.selectTokenExpiryTime);

        case 2:
          tokenExpiryTime = _context3.sent;
          _context3.next = 5;
          return (0, _effects.call)(_reduxSaga.delay, tokenExpiryTime);

        case 5:
          _context3.next = 7;
          return (0, _effects.put)((0, _actions.refreshTokenAction)());

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function clearTokenSaga() {
  return regeneratorRuntime.wrap(function clearTokenSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.call)(_utils.removeTokenFromStorage);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function refreshTokenSaga() {
  var token, response, hasTokenRefreshed;
  return regeneratorRuntime.wrap(function refreshTokenSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.select)(_selectors.selectToken);

        case 2:
          token = _context5.sent;

          if (!token) {
            _context5.next = 16;
            break;
          }

          _context5.prev = 4;
          _context5.next = 7;
          return (0, _effects.call)(_api.refreshToken, token);

        case 7:
          response = _context5.sent;
          _context5.next = 10;
          return (0, _effects.put)((0, _actions.setTokenAction)(response.data.token));

        case 10:
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5['catch'](4);
          _context5.next = 16;
          return (0, _effects.put)((0, _actions.clearTokenAction)(_context5.t0));

        case 16:
          _context5.next = 18;
          return (0, _effects.select)(_selectors.selectHasTokenRefreshed);

        case 18:
          hasTokenRefreshed = _context5.sent;

          if (hasTokenRefreshed) {
            _context5.next = 22;
            break;
          }

          _context5.next = 22;
          return (0, _effects.put)((0, _actions.markTokenAsRefreshedAction)());

        case 22:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this, [[4, 12]]);
}

function setTokenIfExistsSaga(action) {
  var token;
  return regeneratorRuntime.wrap(function setTokenIfExistsSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          token = (0, _selectors.selectTokenFromActionPayload)(action);

          if (!token) {
            _context6.next = 4;
            break;
          }

          _context6.next = 4;
          return (0, _effects.put)((0, _actions.setTokenAction)(token));

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

exports.default = [defaultSaga];