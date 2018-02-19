'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchConfirmCodeAction = watchConfirmCodeAction;
exports.confirmCodeSaga = confirmCodeSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _selectors = require('../AuthenticationProvider/selectors');

var _actions = require('../AuthenticationProvider/actions');

var _actions2 = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchConfirmCodeAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(confirmCodeSaga);

function watchConfirmCodeAction() {
  var confirmCodeActionWatcher;
  return regeneratorRuntime.wrap(function watchConfirmCodeAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.CONFIRM_CODE_ACTION, confirmCodeSaga);

        case 2:
          confirmCodeActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(confirmCodeActionWatcher);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function confirmCodeSaga(action) {
  var token, code, response;
  return regeneratorRuntime.wrap(function confirmCodeSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.select)(_selectors.selectToken);

        case 3:
          token = _context2.sent;
          code = action.payload.get('code');
          _context2.next = 7;
          return (0, _effects.call)(_api.twoFactorConfirmCode, token, code);

        case 7:
          response = _context2.sent;
          _context2.next = 10;
          return (0, _effects.put)((0, _actions2.confirmCodeSuccessAction)(response));

        case 10:
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.successAuthenticationResponseAction)(response));

        case 12:
          _context2.next = 14;
          return (0, _effects.call)(action.resolve, response);

        case 14:
          _context2.next = 24;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 20;
          return (0, _effects.put)((0, _actions2.confirmCodeFailedAction)(_context2.t0));

        case 20:
          _context2.next = 22;
          return (0, _effects.put)((0, _actions.failedAuthenticationResponseAction)(_context2.t0));

        case 22:
          _context2.next = 24;
          return (0, _effects.call)(action.reject, _context2.t0);

        case 24:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 16]]);
}

exports.default = [watchConfirmCodeAction];