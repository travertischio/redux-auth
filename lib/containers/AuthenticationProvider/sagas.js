'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchClearTokenDataAction = watchClearTokenDataAction;
exports.clearTokenSaga = clearTokenSaga;
exports.watchExtendTokenLifetimeAction = watchExtendTokenLifetimeAction;
exports.extendTokenLifetimeSaga = extendTokenLifetimeSaga;
exports.watchMarkTokenAsInvalidAction = watchMarkTokenAsInvalidAction;
exports.markTokenAsInvalidSaga = markTokenAsInvalidSaga;
exports.watchSetTokenDataAction = watchSetTokenDataAction;
exports.putExtendTokenLifetimeActionWithDelaySaga = putExtendTokenLifetimeActionWithDelaySaga;
exports.setTokenDataSaga = setTokenDataSaga;
exports.watchSignOutAction = watchSignOutAction;
exports.signOutSaga = signOutSaga;
exports.watchTwoFactorSendCodeAction = watchTwoFactorSendCodeAction;
exports.twoFactorSendCodeSaga = twoFactorSendCodeSaga;
exports.watchLastUserTokenAction = watchLastUserTokenAction;
exports.lastUserTokenSaga = lastUserTokenSaga;
exports.watchSuccessAuthenticationResponseAction = watchSuccessAuthenticationResponseAction;
exports.watchFailedAuthenticationResponseAction = watchFailedAuthenticationResponseAction;
exports.onSuccessAuthenticationResponseAction = onSuccessAuthenticationResponseAction;
exports.onFailedAuthenticationResponseAction = onFailedAuthenticationResponseAction;
exports.defaultSuccessAuthenticationResponseSaga = defaultSuccessAuthenticationResponseSaga;
exports.defaultFailedAuthenticationResponseSaga = defaultFailedAuthenticationResponseSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _api = require('../../api');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _actions = require('./actions');

var _selectors = require('./selectors');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchClearTokenDataAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(clearTokenSaga),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchExtendTokenLifetimeAction),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(extendTokenLifetimeSaga),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(watchMarkTokenAsInvalidAction),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(markTokenAsInvalidSaga),
    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(watchSetTokenDataAction),
    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(putExtendTokenLifetimeActionWithDelaySaga),
    _marked9 = /*#__PURE__*/regeneratorRuntime.mark(setTokenDataSaga),
    _marked10 = /*#__PURE__*/regeneratorRuntime.mark(markAuthenticationProviderAsReady),
    _marked11 = /*#__PURE__*/regeneratorRuntime.mark(extendTokenLifetime),
    _marked12 = /*#__PURE__*/regeneratorRuntime.mark(watchSignOutAction),
    _marked13 = /*#__PURE__*/regeneratorRuntime.mark(signOutSaga),
    _marked14 = /*#__PURE__*/regeneratorRuntime.mark(watchTwoFactorSendCodeAction),
    _marked15 = /*#__PURE__*/regeneratorRuntime.mark(twoFactorSendCodeSaga),
    _marked16 = /*#__PURE__*/regeneratorRuntime.mark(watchLastUserTokenAction),
    _marked17 = /*#__PURE__*/regeneratorRuntime.mark(lastUserTokenSaga),
    _marked18 = /*#__PURE__*/regeneratorRuntime.mark(watchSuccessAuthenticationResponseAction),
    _marked19 = /*#__PURE__*/regeneratorRuntime.mark(watchFailedAuthenticationResponseAction),
    _marked20 = /*#__PURE__*/regeneratorRuntime.mark(onSuccessAuthenticationResponseAction),
    _marked21 = /*#__PURE__*/regeneratorRuntime.mark(onFailedAuthenticationResponseAction),
    _marked22 = /*#__PURE__*/regeneratorRuntime.mark(defaultSuccessAuthenticationResponseSaga),
    _marked23 = /*#__PURE__*/regeneratorRuntime.mark(defaultFailedAuthenticationResponseSaga);

function watchClearTokenDataAction() {
  return regeneratorRuntime.wrap(function watchClearTokenDataAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.CLEAR_TOKEN_DATA_ACTION, clearTokenSaga);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function clearTokenSaga() {
  return regeneratorRuntime.wrap(function clearTokenSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(_utils.removeAuthDataFromStorage);

        case 2:
          _context2.next = 4;
          return (0, _effects.call)(_api.removeAuthorizationTokenInHeaders);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchExtendTokenLifetimeAction() {
  return regeneratorRuntime.wrap(function watchExtendTokenLifetimeAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)(_constants.EXTEND_TOKEN_LIFETIME_ACTION, extendTokenLifetimeSaga);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function extendTokenLifetimeSaga() {
  var token, tokeIsValid, response;
  return regeneratorRuntime.wrap(function extendTokenLifetimeSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.select)(_selectors.selectToken);

        case 2:
          token = _context4.sent;
          _context4.next = 5;
          return (0, _effects.select)(_selectors.selectTokeIsValid);

        case 5:
          tokeIsValid = _context4.sent;

          if (!(token && tokeIsValid)) {
            _context4.next = 25;
            break;
          }

          _context4.prev = 7;
          _context4.next = 10;
          return (0, _effects.call)(extendTokenLifetime, token);

        case 10:
          response = _context4.sent;
          _context4.next = 13;
          return (0, _effects.put)((0, _actions.successAuthenticationResponseAction)(response));

        case 13:
          _context4.next = 21;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4['catch'](7);
          _context4.next = 19;
          return (0, _effects.put)((0, _actions.markTokenAsInvalidAction)());

        case 19:
          _context4.next = 21;
          return (0, _effects.put)((0, _actions.clearUserDataAction)());

        case 21:
          _context4.next = 23;
          return (0, _effects.call)(markAuthenticationProviderAsReady);

        case 23:
          _context4.next = 27;
          break;

        case 25:
          _context4.next = 27;
          return (0, _effects.call)(markAuthenticationProviderAsReady);

        case 27:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this, [[7, 15]]);
}

function watchMarkTokenAsInvalidAction() {
  return regeneratorRuntime.wrap(function watchMarkTokenAsInvalidAction$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.takeEvery)(_constants.MARK_TOKEN_AS_INVALID_ACTION, markTokenAsInvalidSaga);

        case 2:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function markTokenAsInvalidSaga() {
  var tokenData;
  return regeneratorRuntime.wrap(function markTokenAsInvalidSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.select)(_selectors.selectTokenDataAsInvalid);

        case 2:
          tokenData = _context6.sent;
          _context6.next = 5;
          return (0, _effects.put)((0, _actions.setTokenDataAction)(tokenData));

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function watchSetTokenDataAction() {
  return regeneratorRuntime.wrap(function watchSetTokenDataAction$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_DATA_ACTION, setTokenDataSaga);

        case 2:
          _context7.next = 4;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_DATA_ACTION, putExtendTokenLifetimeActionWithDelaySaga);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function putExtendTokenLifetimeActionWithDelaySaga(action) {
  var extendTokenWithinMs;
  return regeneratorRuntime.wrap(function putExtendTokenLifetimeActionWithDelaySaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(0, _utils.tokenIsValid)(action.tokenData)) {
            _context8.next = 8;
            break;
          }

          _context8.next = 3;
          return (0, _effects.select)(_selectors.selectExtendTokenWithinMs);

        case 3:
          extendTokenWithinMs = _context8.sent;
          _context8.next = 6;
          return (0, _effects.call)(_reduxSaga.delay, extendTokenWithinMs);

        case 6:
          _context8.next = 8;
          return (0, _effects.put)((0, _actions.extendTokenLifetimeAction)());

        case 8:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked8, this);
}

function setTokenDataSaga(action) {
  var tokenData;
  return regeneratorRuntime.wrap(function setTokenDataSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          tokenData = action.tokenData;
          _context9.next = 3;
          return (0, _effects.call)(_utils.setAuthDataInStorage, { tokenData: tokenData });

        case 3:
          if (!(0, _utils.tokenIsValid)(tokenData)) {
            _context9.next = 8;
            break;
          }

          _context9.next = 6;
          return (0, _effects.call)(_api.setAuthorizationTokenInHeaders, tokenData.key);

        case 6:
          _context9.next = 10;
          break;

        case 8:
          _context9.next = 10;
          return (0, _effects.call)(_api.removeAuthorizationTokenInHeaders);

        case 10:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked9, this);
}

function markAuthenticationProviderAsReady() {
  var authenticationProviderIsReady;
  return regeneratorRuntime.wrap(function markAuthenticationProviderAsReady$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.select)(_selectors.selectIsReady);

        case 2:
          authenticationProviderIsReady = _context10.sent;

          if (authenticationProviderIsReady) {
            _context10.next = 6;
            break;
          }

          _context10.next = 6;
          return (0, _effects.put)((0, _actions.markAuthenticationProviderAsReadyAction)());

        case 6:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked10, this);
}

function extendTokenLifetime(token) {
  var tokenIsExpired, response;
  return regeneratorRuntime.wrap(function extendTokenLifetime$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          tokenIsExpired = void 0;

        case 1:
          _context11.prev = 1;
          _context11.next = 4;
          return (0, _effects.call)(_api.extendTokenLifetime, token);

        case 4:
          response = _context11.sent;
          return _context11.abrupt('return', response);

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11['catch'](1);

          if (!(!(0, _utils.isNoInternetConnectionError)(_context11.t0) && !(0, _utils.isServerError)(_context11.t0))) {
            _context11.next = 12;
            break;
          }

          return _context11.abrupt('break', 18);

        case 12:
          _context11.next = 14;
          return (0, _effects.call)(_reduxSaga.delay, 5000);

        case 14:
          _context11.next = 16;
          return (0, _effects.select)(_selectors.selectTokenIsExpired);

        case 16:
          tokenIsExpired = _context11.sent;

        case 17:
          if (!tokenIsExpired) {
            _context11.next = 1;
            break;
          }

        case 18:
          throw new Error('Token expired');

        case 19:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked11, this, [[1, 8]]);
}

function watchSignOutAction() {
  return regeneratorRuntime.wrap(function watchSignOutAction$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _effects.takeEvery)(_constants.SIGN_OUT_ACTION, signOutSaga);

        case 2:
        case 'end':
          return _context12.stop();
      }
    }
  }, _marked12, this);
}

function signOutSaga() {
  return regeneratorRuntime.wrap(function signOutSaga$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return (0, _effects.call)(_api.signOut);

        case 3:
          _context13.next = 5;
          return (0, _effects.put)((0, _actions.signOutSuccessAction)());

        case 5:
          _context13.next = 11;
          break;

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13['catch'](0);
          _context13.next = 11;
          return (0, _effects.put)((0, _actions.signOutFailedAction)());

        case 11:
          _context13.next = 13;
          return (0, _effects.put)((0, _actions.markTokenAsInvalidAction)());

        case 13:
          _context13.next = 15;
          return (0, _effects.put)((0, _actions.clearUserDataAction)());

        case 15:
        case 'end':
          return _context13.stop();
      }
    }
  }, _marked13, this, [[0, 7]]);
}

function watchTwoFactorSendCodeAction() {
  return regeneratorRuntime.wrap(function watchTwoFactorSendCodeAction$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.takeEvery)(_constants.TWO_FACTOR_SEND_CODE_ACTION, twoFactorSendCodeSaga);

        case 2:
        case 'end':
          return _context14.stop();
      }
    }
  }, _marked14, this);
}

function twoFactorSendCodeSaga(action) {
  return regeneratorRuntime.wrap(function twoFactorSendCodeSaga$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return (0, _effects.call)(_api.twoFactorSendCode, action.token);

        case 3:
          _context15.next = 5;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeSuccessAction)());

        case 5:
          _context15.next = 11;
          break;

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15['catch'](0);
          _context15.next = 11;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeFailedAction)(_context15.t0));

        case 11:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked15, this, [[0, 7]]);
}

function watchLastUserTokenAction() {
  return regeneratorRuntime.wrap(function watchLastUserTokenAction$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_LAST_USER_TOKEN, lastUserTokenSaga);

        case 2:
        case 'end':
          return _context16.stop();
      }
    }
  }, _marked16, this);
}

function lastUserTokenSaga(action) {
  var key, token;
  return regeneratorRuntime.wrap(function lastUserTokenSaga$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          key = action.key, token = action.token;
          _context17.next = 3;
          return (0, _effects.call)(_utils.storeLastUserToken, key, token);

        case 3:
        case 'end':
          return _context17.stop();
      }
    }
  }, _marked17, this);
}

function watchSuccessAuthenticationResponseAction() {
  return regeneratorRuntime.wrap(function watchSuccessAuthenticationResponseAction$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _effects.takeEvery)(_constants.SUCCESS_AUTHENTICATION_RESPONSE_ACTION, onSuccessAuthenticationResponseAction);

        case 2:
        case 'end':
          return _context18.stop();
      }
    }
  }, _marked18, this);
}

function watchFailedAuthenticationResponseAction() {
  return regeneratorRuntime.wrap(function watchFailedAuthenticationResponseAction$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _effects.takeEvery)(_constants.FAILED_AUTHENTICATION_RESPONSE_ACTION, onFailedAuthenticationResponseAction);

        case 2:
        case 'end':
          return _context19.stop();
      }
    }
  }, _marked19, this);
}

function onSuccessAuthenticationResponseAction(action) {
  var successAuthenticationResponseSaga;
  return regeneratorRuntime.wrap(function onSuccessAuthenticationResponseAction$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          successAuthenticationResponseSaga = _config2.default.successAuthenticationResponseSaga || defaultSuccessAuthenticationResponseSaga;
          return _context20.delegateYield(successAuthenticationResponseSaga(action), 't0', 2);

        case 2:
        case 'end':
          return _context20.stop();
      }
    }
  }, _marked20, this);
}

function onFailedAuthenticationResponseAction(action) {
  var failedAuthenticationResponseSaga;
  return regeneratorRuntime.wrap(function onFailedAuthenticationResponseAction$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          failedAuthenticationResponseSaga = _config2.default.failedAuthenticationResponseSaga || defaultFailedAuthenticationResponseSaga;
          return _context21.delegateYield(failedAuthenticationResponseSaga(action), 't0', 2);

        case 2:
        case 'end':
          return _context21.stop();
      }
    }
  }, _marked21, this);
}

function defaultSuccessAuthenticationResponseSaga(action) {
  var _action$response$data, tokenData, userData, lastUserTokenKey;

  return regeneratorRuntime.wrap(function defaultSuccessAuthenticationResponseSaga$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _action$response$data = action.response.data, tokenData = _action$response$data.tokenData, userData = _action$response$data.userData;

          if (!tokenData) {
            _context22.next = 9;
            break;
          }

          _context22.next = 4;
          return (0, _effects.put)((0, _actions.setTokenDataAction)(tokenData));

        case 4:
          if (!(0, _utils.tokenIsAwaitingSecondFactor)(tokenData)) {
            _context22.next = 9;
            break;
          }

          _context22.next = 7;
          return (0, _effects.put)((0, _actions.twoFactorSendCodeAction)(tokenData.key));

        case 7:
          _context22.next = 9;
          return (0, _effects.put)((0, _reactRouterRedux.push)(_config2.default.signInConfirmCodePageUrl));

        case 9:
          if (!userData) {
            _context22.next = 12;
            break;
          }

          _context22.next = 12;
          return (0, _effects.put)((0, _actions.setUserDataAction)(userData));

        case 12:
          if (!(tokenData && userData)) {
            _context22.next = 16;
            break;
          }

          lastUserTokenKey = (0, _utils.generateLastUserTokenKey)(userData.email);
          _context22.next = 16;
          return (0, _effects.put)((0, _actions.setLastUserTokenAction)(lastUserTokenKey, tokenData.key));

        case 16:
        case 'end':
          return _context22.stop();
      }
    }
  }, _marked22, this);
}

function defaultFailedAuthenticationResponseSaga(action) {
  var _action$error$respons, captcha, userBlocked;

  return regeneratorRuntime.wrap(function defaultFailedAuthenticationResponseSaga$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _action$error$respons = action.error.response.data, captcha = _action$error$respons.captcha, userBlocked = _action$error$respons.userBlocked;

          if (!captcha) {
            _context23.next = 4;
            break;
          }

          _context23.next = 4;
          return (0, _effects.put)((0, _actions.requireCaptchaAction)());

        case 4:
          if (!userBlocked) {
            _context23.next = 7;
            break;
          }

          _context23.next = 7;
          return (0, _effects.put)((0, _actions.blockedAccountAction)());

        case 7:
          _context23.next = 9;
          return true;

        case 9:
        case 'end':
          return _context23.stop();
      }
    }
  }, _marked23, this);
}

exports.default = [watchClearTokenDataAction, watchExtendTokenLifetimeAction, watchFailedAuthenticationResponseAction, watchLastUserTokenAction, watchMarkTokenAsInvalidAction, watchSetTokenDataAction, watchSignOutAction, watchSuccessAuthenticationResponseAction, watchTwoFactorSendCodeAction];