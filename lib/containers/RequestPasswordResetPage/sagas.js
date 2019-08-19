"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;
exports.requestPasswordReset = requestPasswordReset;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _reactRouterRedux = require("react-router-redux");

var _api = require("../../api");

var _actions = require("./actions");

var _constants = require("./constants");

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(defaultSaga),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(requestPasswordReset);

function defaultSaga() {
  var RequestPasswordResetActionWatcher;
  return _regenerator["default"].wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_constants.REQUEST_PASSWORD_RESET_ACTION, requestPasswordReset);

        case 2:
          RequestPasswordResetActionWatcher = _context.sent;
          _context.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context.next = 7;
          return (0, _effects.cancel)(RequestPasswordResetActionWatcher);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function requestPasswordReset(action) {
  var response;
  return _regenerator["default"].wrap(function requestPasswordReset$(_context2) {
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
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions.requestPasswordResetFailedAction)(_context2.t0));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 8]]);
}

var _default = [defaultSaga];
exports["default"] = _default;