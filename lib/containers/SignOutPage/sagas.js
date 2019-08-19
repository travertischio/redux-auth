"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.signOutSaga = signOutSaga;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _reactRouterRedux = require("react-router-redux");

var _constants = require("../AuthenticationProvider/constants");

var _config = _interopRequireDefault(require("../../config"));

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(defaultSaga),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(signOutSaga);

function defaultSaga() {
  var signOutSuccessActionWatcher, signOutFailedActionWatcher;
  return _regenerator["default"].wrap(function defaultSaga$(_context) {
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
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function signOutSaga() {
  return _regenerator["default"].wrap(function signOutSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config["default"].redirectPathAfterSignOut));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var _default = [defaultSaga];
exports["default"] = _default;