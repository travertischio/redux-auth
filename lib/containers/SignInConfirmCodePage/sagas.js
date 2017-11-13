'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchConfirmCodeAction = watchConfirmCodeAction;
exports.watchConfirmCodeSuccessAction = watchConfirmCodeSuccessAction;
exports.confirmCodeSaga = confirmCodeSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _selectors = require('../AuthenticationProvider/selectors');

var _sagas = require('../AuthenticationProvider/sagas');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchConfirmCodeAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchConfirmCodeSuccessAction),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(confirmCodeSaga);

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

function watchConfirmCodeSuccessAction() {
  var signInSuccessActionWatcher;
  return regeneratorRuntime.wrap(function watchConfirmCodeSuccessAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_constants.CONFIRM_CODE_SUCCESS_ACTION, _sagas.handleAuthenticationSaga);

        case 2:
          signInSuccessActionWatcher = _context2.sent;
          _context2.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context2.next = 7;
          return (0, _effects.cancel)(signInSuccessActionWatcher);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function confirmCodeSaga(action) {
  var token, code, response;
  return regeneratorRuntime.wrap(function confirmCodeSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.select)(_selectors.selectToken);

        case 3:
          token = _context3.sent;
          code = action.payload.get('code');
          _context3.next = 7;
          return (0, _effects.call)(_api.twoFactorConfirmCode, token, code);

        case 7:
          response = _context3.sent;
          _context3.next = 10;
          return (0, _effects.put)((0, _actions.confirmCodeSuccessAction)(response));

        case 10:
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3['catch'](0);
          _context3.next = 16;
          return (0, _effects.put)((0, _actions.confirmCodeFailedAction)(_context3.t0));

        case 16:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 12]]);
}

exports.default = [watchConfirmCodeAction, watchConfirmCodeSuccessAction];