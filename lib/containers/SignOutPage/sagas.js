'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signOutSaga = signOutSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../AuthenticationProvider/actions');

var _constants = require('./constants');

var _marked = [defaultSaga, signOutSaga].map(regeneratorRuntime.mark);

function defaultSaga() {
  var signOutActionWatcher;
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxSaga.takeEvery)(_constants.SIGN_OUT_ACTION, signOutSaga);

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
  return regeneratorRuntime.wrap(function signOutSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.put)((0, _actions.clearTokenAction)());

        case 2:
          _context2.next = 4;
          return (0, _effects.put)((0, _reactRouterRedux.push)('/'));

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

exports.default = [defaultSaga, signOutSaga];