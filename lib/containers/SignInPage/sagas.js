'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signInSaga = signInSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _sagas = require('../AuthenticationProvider/sagas');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(signInSaga);

function defaultSaga() {
  var signInActionWatcher, signInSuccessActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.SIGN_IN_ACTION, signInSaga);

        case 2:
          signInActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.takeEvery)(_constants.SIGN_IN_SUCCESS_ACTION, _sagas.handleAuthenticationSaga);

        case 5:
          signInSuccessActionWatcher = _context.sent;
          _context.next = 8;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 8:
          _context.next = 10;
          return (0, _effects.cancel)(signInActionWatcher);

        case 10:
          _context.next = 12;
          return (0, _effects.cancel)(signInSuccessActionWatcher);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function signInSaga(action) {
  var response;
  return regeneratorRuntime.wrap(function signInSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.signIn, action.payload);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions.signInSuccessAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.signInFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 8]]);
}

exports.default = [defaultSaga];