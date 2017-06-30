'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.requestPasswordReset = requestPasswordReset;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = [defaultSaga, requestPasswordReset].map(regeneratorRuntime.mark);

function defaultSaga() {
  var RequestPasswordResetActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeLatest)(_constants.REQUEST_PASSWORD_RESET_ACTION, requestPasswordReset);

        case 2:
          RequestPasswordResetActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(RequestPasswordResetActionWatcher);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function requestPasswordReset(action) {
  var response;
  return regeneratorRuntime.wrap(function requestPasswordReset$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_api.requestPasswordReset, action.payload);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions.requestPasswordResetSuccessAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.requestPasswordResetFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 8]]);
}

exports.default = [defaultSaga];