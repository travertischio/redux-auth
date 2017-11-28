'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signOutSaga = signOutSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _constants = require('../AuthenticationProvider/constants');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(signOutSaga);

function defaultSaga() {
  var signOutSuccessActionWatcher, signOutFailedActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.SIGN_OUT_SUCCESS_ACTION, signOutSaga);

        case 2:
          signOutSuccessActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.takeEvery)(_constants.SIGN_OUT_FAILED_ACTION, signOutSaga);

        case 5:
          signOutFailedActionWatcher = _context.sent;
          _context.next = 8;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 8:
          _context.next = 10;
          return (0, _effects.cancel)(signOutSuccessActionWatcher);

        case 10:
          _context.next = 12;
          return (0, _effects.cancel)(signOutFailedActionWatcher);

        case 12:
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
          _context2.next = 2;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config2.default.redirectPathAfterSignOut));

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

exports.default = [defaultSaga];