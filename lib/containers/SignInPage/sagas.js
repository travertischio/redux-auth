"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSignInAction = watchSignInAction;
exports.signInSaga = signInSaga;
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _reactRouterRedux = require("react-router-redux");

var _api = require("../../api");

var _selectors = require("../AuthenticationProvider/selectors");

var _actions = require("../AuthenticationProvider/actions");

var _actions2 = require("./actions");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(watchSignInAction),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(signInSaga);

function watchSignInAction() {
  var signInActionWatcher;
  return _regenerator["default"].wrap(function watchSignInAction$(_context) {
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
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function signInSaga(action) {
  var selectLastUserToken, lastToken, credentials, response;
  return _regenerator["default"].wrap(function signInSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_selectors.makeSelectLastUserToken, action.credentials.get('email'));

        case 3:
          selectLastUserToken = _context2.sent;
          _context2.next = 6;
          return (0, _effects.select)(selectLastUserToken);

        case 6:
          lastToken = _context2.sent;
          credentials = _objectSpread({
            token: lastToken
          }, action.credentials.toJS());
          _context2.next = 10;
          return (0, _effects.call)(_api.signIn, credentials);

        case 10:
          response = _context2.sent;
          _context2.next = 13;
          return (0, _effects.put)((0, _actions2.signInSuccessAction)(response));

        case 13:
          _context2.next = 15;
          return (0, _effects.put)((0, _actions.successAuthenticationResponseAction)(response));

        case 15:
          _context2.next = 23;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 21;
          return (0, _effects.put)((0, _actions2.signInFailedAction)(_context2.t0));

        case 21:
          _context2.next = 23;
          return (0, _effects.put)((0, _actions.failedAuthenticationResponseAction)(_context2.t0));

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 17]]);
}

var _default = [watchSignInAction];
exports["default"] = _default;