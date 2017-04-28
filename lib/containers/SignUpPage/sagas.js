'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signUp = signUp;
exports.setTokenIfExists = setTokenIfExists;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _actions = require('../AuthenticationProvider/actions');

var _selectors = require('../AuthenticationProvider/selectors');

var _actions2 = require('./actions');

var _constants = require('./constants');

var _marked = [defaultSaga, signUp, setTokenIfExists].map(regeneratorRuntime.mark);

function defaultSaga() {
  var signUpActionWatcher, signUpSucceedActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.SIGN_UP_ACTION, signUp);

        case 2:
          signUpActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.takeEvery)(_constants.SIGN_UP_SUCCEED_ACTION, setTokenIfExists);

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

function signUp(action) {
  var response;
  return regeneratorRuntime.wrap(function signUp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.signUp, action.payload);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions2.signUpSucceedAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions2.signUpFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 8]]);
}

function setTokenIfExists(action) {
  var token;
  return regeneratorRuntime.wrap(function setTokenIfExists$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = (0, _selectors.selectTokenFromActionPayload)(action);

          if (!token) {
            _context3.next = 4;
            break;
          }

          _context3.next = 4;
          return (0, _effects.put)((0, _actions.setTokenAction)(token));

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

exports.default = [defaultSaga];