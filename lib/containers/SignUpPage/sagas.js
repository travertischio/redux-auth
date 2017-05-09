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

var _marked = [defaultSaga, signUpSaga].map(regeneratorRuntime.mark);

function defaultSaga() {
  var signUpActionWatcher, signUpSucceedActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeLatest)(_constants.SIGN_UP_ACTION, signUpSaga);

        case 2:
          signUpActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _reduxSaga.takeEvery)(_constants.SIGN_UP_SUCCEED_ACTION, _sagas.setTokenIfExistsSaga);

        case 5:
          signUpSucceedActionWatcher = _context.sent;
          _context.next = 8;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 8:
          _context.next = 10;
          return (0, _effects.cancel)(signUpActionWatcher);

        case 10:
          _context.next = 12;
          return (0, _effects.cancel)(signUpSucceedActionWatcher);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function signUpSaga(action) {
  var response;
  return regeneratorRuntime.wrap(function signUpSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.signUp, action.payload);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions.signUpSucceedAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.signUpFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 8]]);
}

exports.default = [defaultSaga];