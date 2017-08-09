'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signOutSaga = signOutSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../AuthenticationProvider/actions');

var _selectors = require('../AuthenticationProvider/selectors');

var _constants = require('./constants');

var _api = require('../../api');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [defaultSaga, signOutSaga].map(regeneratorRuntime.mark);

function defaultSaga() {
  var signOutActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.SIGN_OUT_ACTION, signOutSaga);

        case 2:
          signOutActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(signOutActionWatcher);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function signOutSaga() {
  var deviceId;
  return regeneratorRuntime.wrap(function signOutSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.select)(_selectors.selectDeviceId);

        case 2:
          deviceId = _context2.sent;

          if (!deviceId) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return (0, _effects.call)(_api.signOut, deviceId);

        case 6:
          _context2.next = 8;
          return (0, _effects.put)((0, _actions.clearTokenAction)());

        case 8:
          _context2.next = 10;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config2.default.redirectPathAfterSignOut));

        case 10:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

exports.default = [defaultSaga];