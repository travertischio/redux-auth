'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.setToken = setToken;
exports.putRefreshTokenActionWithDelay = putRefreshTokenActionWithDelay;
exports.clearToken = clearToken;
exports.refreshToken = refreshToken;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

var _actions = require('./actions');

var _selectors = require('./selectors');

var _api = require('../../api');

var _constants = require('./constants');

var _marked = [defaultSaga, setToken, putRefreshTokenActionWithDelay, clearToken, refreshToken].map(regeneratorRuntime.mark);

function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_ACTION, setToken);

        case 2:
          _context.next = 4;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_ACTION, putRefreshTokenActionWithDelay);

        case 4:
          _context.next = 6;
          return (0, _effects.takeEvery)(_constants.CLEAR_TOKEN_ACTION, clearToken);

        case 6:
          _context.next = 8;
          return (0, _effects.takeEvery)(_constants.REFRESH_TOKEN_ACTION, refreshToken);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function setToken(action) {
  var token;
  return regeneratorRuntime.wrap(function setToken$(_context2) {
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

function putRefreshTokenActionWithDelay() {
  var tokenExpiryTime;
  return regeneratorRuntime.wrap(function putRefreshTokenActionWithDelay$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.select)((0, _selectors.makeSelecTokenExpiryTime)());

        case 2:
          tokenExpiryTime = _context3.sent;
          _context3.next = 5;
          return (0, _reduxSaga.delay)(tokenExpiryTime);

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

function clearToken() {
  return regeneratorRuntime.wrap(function clearToken$(_context4) {
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

function refreshToken() {
  var token, response, hasTokenRefreshed;
  return regeneratorRuntime.wrap(function refreshToken$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.select)((0, _selectors.makeSelectToken)());

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
          return (0, _effects.select)((0, _selectors.makeSelectHasTokenRefreshed)());

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

exports.default = [defaultSaga];