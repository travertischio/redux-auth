'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSetTokenDataAction = watchSetTokenDataAction;
exports.watchTwoFactorSendCodeAction = watchTwoFactorSendCodeAction;
exports.watchClearTokenDataAction = watchClearTokenDataAction;
exports.watchExtendTokenLifetimeAction = watchExtendTokenLifetimeAction;
exports.setTokenDataSaga = setTokenDataSaga;
exports.putExtendTokenLifetimeActionWithDelaySaga = putExtendTokenLifetimeActionWithDelaySaga;
exports.clearTokenSaga = clearTokenSaga;
exports.extendTokenLifetimeSaga = extendTokenLifetimeSaga;
exports.handleAuthenticationSaga = handleAuthenticationSaga;
exports.twoFactorSendCodeSaga = twoFactorSendCodeSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _utils = require('./utils');

var _actions = require('./actions');

var _selectors = require('./selectors');

var _api = require('../../api');

var _constants = require('./constants');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchSetTokenDataAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchTwoFactorSendCodeAction),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchClearTokenDataAction),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(watchExtendTokenLifetimeAction),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(setTokenDataSaga),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(putExtendTokenLifetimeActionWithDelaySaga),
    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(clearTokenSaga),
    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(extendTokenLifetimeSaga),
    _marked9 = /*#__PURE__*/regeneratorRuntime.mark(markAuthenticationProviderAsReady),
    _marked10 = /*#__PURE__*/regeneratorRuntime.mark(extendTokenLifetime),
    _marked11 = /*#__PURE__*/regeneratorRuntime.mark(handleAuthenticationSaga),
    _marked12 = /*#__PURE__*/regeneratorRuntime.mark(twoFactorSendCodeSaga);

function watchSetTokenDataAction() {
  return regeneratorRuntime.wrap(function watchSetTokenDataAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_DATA_ACTION, setTokenDataSaga);

        case 2:
          _context.next = 4;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_DATA_ACTION, putExtendTokenLifetimeActionWithDelaySaga);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function watchTwoFactorSendCodeAction() {
  return regeneratorRuntime.wrap(function watchTwoFactorSendCodeAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_constants.TWO_FACTOR_SEND_CODE_ACTION, twoFactorSendCodeSaga);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchClearTokenDataAction() {
  return regeneratorRuntime.wrap(function watchClearTokenDataAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)(_constants.CLEAR_TOKEN_DATA_ACTION, clearTokenSaga);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function watchExtendTokenLifetimeAction() {
  return regeneratorRuntime.wrap(function watchExtendTokenLifetimeAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeEvery)(_constants.EXTEND_TOKEN_LIFETIME_ACTION, extendTokenLifetimeSaga);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function setTokenDataSaga(action) {
  var tokenData;
  return regeneratorRuntime.wrap(function setTokenDataSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          tokenData = action.tokenData;
          _context5.next = 3;
          return (0, _effects.call)(_utils.setAuthDataInStorage, { tokenData: tokenData });

        case 3:
          if (!(0, _utils.tokenIsValid)(tokenData)) {
            _context5.next = 6;
            break;
          }

          _context5.next = 6;
          return (0, _effects.call)(_api.setAuthorizationTokenInHeaders, tokenData.key);

        case 6:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function putExtendTokenLifetimeActionWithDelaySaga(action) {
  var tokenExpireInMs;
  return regeneratorRuntime.wrap(function putExtendTokenLifetimeActionWithDelaySaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(0, _utils.tokenIsValid)(action.tokenData)) {
            _context6.next = 8;
            break;
          }

          _context6.next = 3;
          return (0, _effects.select)(_selectors.selectTokenExpireInMs);

        case 3:
          tokenExpireInMs = _context6.sent;
          _context6.next = 6;
          return (0, _effects.call)(_reduxSaga.delay, tokenExpireInMs);

        case 6:
          _context6.next = 8;
          return (0, _effects.put)((0, _actions.extendTokenLifetimeAction)());

        case 8:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function clearTokenSaga() {
  return regeneratorRuntime.wrap(function clearTokenSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.call)(_utils.removeAuthDataFromStorage);

        case 2:
          _context7.next = 4;
          return (0, _effects.call)(_api.removeAuthorizationTokenInHeaders);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function extendTokenLifetimeSaga() {
  var token, response, action;
  return regeneratorRuntime.wrap(function extendTokenLifetimeSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.select)(_selectors.selectToken);

        case 2:
          token = _context8.sent;

          if (!token) {
            _context8.next = 22;
            break;
          }

          _context8.prev = 4;
          _context8.next = 7;
          return (0, _effects.call)(extendTokenLifetime, token);

        case 7:
          response = _context8.sent;
          action = {
            payload: response
          };
          _context8.next = 11;
          return (0, _effects.call)(handleAuthenticationSaga, action);

        case 11:
          _context8.next = 18;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8['catch'](4);

          console.log(_context8.t0);
          _context8.next = 18;
          return (0, _effects.put)((0, _actions.clearTokenDataAction)());

        case 18:
          _context8.next = 20;
          return (0, _effects.call)(markAuthenticationProviderAsReady);

        case 20:
          _context8.next = 24;
          break;

        case 22:
          _context8.next = 24;
          return (0, _effects.call)(markAuthenticationProviderAsReady);

        case 24:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked8, this, [[4, 13]]);
}

function markAuthenticationProviderAsReady() {
  var authenticationProviderIsReady;
  return regeneratorRuntime.wrap(function markAuthenticationProviderAsReady$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.select)(_selectors.selectIsReady);

        case 2:
          authenticationProviderIsReady = _context9.sent;

          if (authenticationProviderIsReady) {
            _context9.next = 6;
            break;
          }

          _context9.next = 6;
          return (0, _effects.put)((0, _actions.markAuthenticationProviderAsReadyAction)());

        case 6:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked9, this);
}

function extendTokenLifetime(token) {
  var tokenIsExpired, response;
  return regeneratorRuntime.wrap(function extendTokenLifetime$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          tokenIsExpired = void 0;

        case 1:
          _context10.prev = 1;
          _context10.next = 4;
          return (0, _effects.call)(_api.extendTokenLifetime, token);

        case 4:
          response = _context10.sent;
          return _context10.abrupt('return', response);

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10['catch'](1);

          if (!(isNoInternetConnectionError(_context10.t0) || isServerError(_context10.t0))) {
            _context10.next = 15;
            break;
          }

          _context10.next = 13;
          return (0, _effects.call)(_reduxSaga.delay, 5000);

        case 13:
          _context10.next = 16;
          break;

        case 15:
          return _context10.abrupt('break', 20);

        case 16:
          _context10.next = 18;
          return (0, _effects.select)(_selectors.selectTokenIsExpired);

        case 18:
          tokenIsExpired = _context10.sent;

        case 19:
          if (!tokenIsExpired) {
            _context10.next = 1;
            break;
          }

        case 20:
          throw new Error('Token expired');

        case 21:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked10, this, [[1, 8]]);
}

function isNoInternetConnectionError(error) {
  return !error.response;
}

function isServerError(error) {
  var status = error.response && error.response.status;

  return status >= 500;
}

function handleAuthenticationSaga(action) {
  var tokenData, userData;
  return regeneratorRuntime.wrap(function handleAuthenticationSaga$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          tokenData = (0, _selectors.selectTokenDataFromActionPayload)(action);
          userData = (0, _selectors.selectUserDataFromActionPayload)(action);

          if (!tokenData) {
            _context11.next = 10;
            break;
          }

          _context11.next = 5;
          return (0, _effects.put)((0, _actions.setTokenDataAction)(tokenData));

        case 5:
          if (!(0, _utils.tokenIsAwaitingSecondFactor)(tokenData)) {
            _context11.next = 10;
            break;
          }

          _context11.next = 8;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeAction)(tokenData.key));

        case 8:
          _context11.next = 10;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config2.default.signInConfirmCodePageUrl));

        case 10:
          if (!userData) {
            _context11.next = 13;
            break;
          }

          _context11.next = 13;
          return (0, _effects.put)((0, _actions.setUserDataAction)(userData));

        case 13:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked11, this);
}

function twoFactorSendCodeSaga(action) {
  return regeneratorRuntime.wrap(function twoFactorSendCodeSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _effects.call)(_api.twoFactorSendCode, action.token);

        case 3:
          _context12.next = 5;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeSuccessAction)());

        case 5:
          _context12.next = 11;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12['catch'](0);
          _context12.next = 11;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeFailedAction)(_context12.t0));

        case 11:
        case 'end':
          return _context12.stop();
      }
    }
  }, _marked12, this, [[0, 7]]);
}

exports.default = [watchSetTokenDataAction, watchClearTokenDataAction, watchTwoFactorSendCodeAction, watchExtendTokenLifetimeAction];