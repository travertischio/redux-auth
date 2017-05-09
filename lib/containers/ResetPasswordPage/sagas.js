'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.resetPasswordSaga = resetPasswordSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _sagas = require('../AuthenticationProvider/sagas');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = [defaultSaga, resetPasswordSaga].map(regeneratorRuntime.mark);
// TODO: move it to redux-auth


function defaultSaga() {
  var resetPasswordActionWatcher, resetPasswordSucceedActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeLatest)(_constants.RESET_PASSWORD_ACTION, resetPasswordSaga);

        case 2:
          resetPasswordActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _reduxSaga.takeEvery)(_constants.RESET_PASSWORD_SUCCEED_ACTION, _sagas.setTokenIfExistsSaga);

        case 5:
          resetPasswordSucceedActionWatcher = _context.sent;
          _context.next = 8;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 8:
          _context.next = 10;
          return (0, _effects.cancel)(resetPasswordActionWatcher);

        case 10:
          _context.next = 12;
          return (0, _effects.cancel)(resetPasswordSucceedActionWatcher);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
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
          return (0, _effects.put)((0, _actions.resetPasswordSucceedAction)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.resetPasswordFailedAction)(_context2.t0));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 8]]);
}

exports.default = [defaultSaga];