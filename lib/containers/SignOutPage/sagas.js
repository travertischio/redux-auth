'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signOutSaga = signOutSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../AuthenticationProvider/actions');

var _actions2 = require('./actions');

var _constants = require('./constants');

var _api = require('../../api');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(signOutSaga);

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
  }, _marked, this);
}

function signOutSaga() {
  return regeneratorRuntime.wrap(function signOutSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.signOut);

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 9;
          return (0, _effects.put)((0, _actions2.signOutFailedAction)());

        case 9:
          _context2.next = 11;
          return (0, _effects.put)((0, _actions.clearTokenDataAction)());

        case 11:
          _context2.next = 13;
          return (0, _effects.put)((0, _actions.clearUserDataAction)());

        case 13:
          _context2.next = 15;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config2.default.redirectPathAfterSignOut));

        case 15:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 5]]);
}

exports.default = [defaultSaga];