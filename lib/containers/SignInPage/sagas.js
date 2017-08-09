'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signInSaga = signInSaga;
exports.onSignInSuccessSaga = onSignInSuccessSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _actions = require('../AuthenticationProvider/actions');

var _selectors = require('../AuthenticationProvider/selectors');

var _actions2 = require('./actions');

var _constants = require('./constants');

var _marked = [defaultSaga, signInSaga, onSignInSuccessSaga].map(regeneratorRuntime.mark);

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
          return (0, _effects.takeEvery)(_constants.SIGN_IN_SUCCESS_ACTION, onSignInSuccessSaga);

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
  }, _marked[0], this);
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
          return (0, _effects.put)((0, _actions2.signInSuccessAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions2.signInFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 8]]);
}

function onSignInSuccessSaga(action) {
  var token, payload;
  return regeneratorRuntime.wrap(function onSignInSuccessSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = (0, _selectors.selectTokenFromActionPayload)(action);
          payload = (0, _selectors.selectPermanentTokenAndDeviceIdFromActionPayload)(action);
          _context3.next = 4;
          return (0, _effects.put)((0, _actions.setTokenAction)(token));

        case 4:
          _context3.next = 6;
          return (0, _effects.put)((0, _actions.setPermanentTokenAndDeviceIdAction)(payload));

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

exports.default = [defaultSaga];