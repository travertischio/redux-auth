'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.resetPasswordSaga = resetPasswordSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _actions = require('../AuthenticationProvider/actions');

var _actions2 = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(resetPasswordSaga);

function defaultSaga() {
  var resetPasswordActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.RESET_PASSWORD_ACTION, resetPasswordSaga);

        case 2:
          resetPasswordActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(resetPasswordActionWatcher);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function resetPasswordSaga(action) {
  var response;
  return regeneratorRuntime.wrap(function resetPasswordSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.resetPassword, action.payload);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions2.resetPasswordSuccessAction)(response));

        case 6:
          _context2.next = 8;
          return (0, _effects.put)((0, _actions.successAuthenticationResponseAction)(response));

        case 8:
          _context2.next = 16;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 14;
          return (0, _effects.put)((0, _actions2.resetPasswordFailedAction)(_context2.t0));

        case 14:
          _context2.next = 16;
          return (0, _effects.put)((0, _actions.failedAuthenticationResponseAction)(_context2.t0));

        case 16:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 10]]);
}

exports.default = [defaultSaga];