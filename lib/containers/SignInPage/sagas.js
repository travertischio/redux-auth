'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.watchSignInAction = watchSignInAction;
exports.signInSaga = signInSaga;
exports.watchSignInSuccessAction = watchSignInSuccessAction;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _sagas = require('../AuthenticationProvider/sagas');

var _selectors = require('../AuthenticationProvider/selectors');

var _actions = require('./actions');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchSignInAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(signInSaga),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchSignInSuccessAction);

function watchSignInAction() {
  var signInActionWatcher;
  return regeneratorRuntime.wrap(function watchSignInAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.SIGN_IN_ACTION, signInSaga);

        case 2:
          signInActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(signInActionWatcher);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function signInSaga(action) {
  var selectLastUserToken, lastToken, credentials, response;
  return regeneratorRuntime.wrap(function signInSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          selectLastUserToken = (0, _selectors.makeSelectLastUserToken)(action.credentials.get('email'));
          _context2.next = 4;
          return (0, _effects.select)(selectLastUserToken);

        case 4:
          lastToken = _context2.sent;
          credentials = _extends({
            token: lastToken
          }, action.credentials.toJS());
          _context2.next = 8;
          return (0, _effects.call)(_api.signIn, credentials);

        case 8:
          response = _context2.sent;
          _context2.next = 11;
          return (0, _effects.put)((0, _actions.signInSuccessAction)(response));

        case 11:
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 17;
          return (0, _effects.put)((0, _actions.signInFailedAction)(_context2.t0));

        case 17:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 13]]);
}

function watchSignInSuccessAction() {
  var signInSuccessActionWatcher;
  return regeneratorRuntime.wrap(function watchSignInSuccessAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)(_constants.SIGN_IN_SUCCESS_ACTION, _sagas.handleAuthenticationSaga);

        case 2:
          signInSuccessActionWatcher = _context3.sent;
          _context3.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context3.next = 7;
          return (0, _effects.cancel)(signInSuccessActionWatcher);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

exports.default = [watchSignInAction, watchSignInSuccessAction];