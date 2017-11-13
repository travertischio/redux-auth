'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signUpSaga = signUpSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _sagas = require('../AuthenticationProvider/sagas');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(signUpSaga);

function defaultSaga() {
  var signUpActionWatcher, signUpSuccessActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeLatest)(_constants.SIGN_UP_ACTION, signUpSaga);

        case 2:
          signUpActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _reduxSaga.takeEvery)(_constants.SIGN_UP_SUCCESS_ACTION, _sagas.handleAuthenticationSaga);

        case 5:
          signUpSuccessActionWatcher = _context.sent;
          _context.next = 8;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 8:
          _context.next = 10;
          return (0, _effects.cancel)(signUpActionWatcher);

        case 10:
          _context.next = 12;
          return (0, _effects.cancel)(signUpSuccessActionWatcher);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function signUpSaga(action) {
  var payload, resolve, reject, response;
  return regeneratorRuntime.wrap(function signUpSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = action.payload, resolve = action.resolve, reject = action.reject;
          _context2.prev = 1;
          _context2.next = 4;
          return (0, _effects.call)(_api.signUp, payload);

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return (0, _effects.call)(resolve, response);

        case 7:
          _context2.next = 9;
          return (0, _effects.put)((0, _actions.signUpSuccessAction)(response));

        case 9:
          _context2.next = 17;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2['catch'](1);
          _context2.next = 15;
          return (0, _effects.call)(reject, _context2.t0);

        case 15:
          _context2.next = 17;
          return (0, _effects.put)((0, _actions.signUpFailedAction)(_context2.t0));

        case 17:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 11]]);
}

exports.default = [defaultSaga];