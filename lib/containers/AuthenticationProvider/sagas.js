'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSetTokenAction = watchSetTokenAction;
exports.watchSetPermanentTokenAndDeviceIdAction = watchSetPermanentTokenAndDeviceIdAction;
exports.watchClearTokenAction = watchClearTokenAction;
exports.watchRefreshTokenAction = watchRefreshTokenAction;
exports.setTokenSaga = setTokenSaga;
exports.setPermanentTokenAndDeviceIdSaga = setPermanentTokenAndDeviceIdSaga;
exports.putRefreshTokenActionWithDelaySaga = putRefreshTokenActionWithDelaySaga;
exports.clearTokenSaga = clearTokenSaga;
exports.refreshTokenSaga = refreshTokenSaga;
exports.setTokenIfExistsSaga = setTokenIfExistsSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

var _actions = require('./actions');

var _selectors = require('./selectors');

var _api = require('../../api');

var _constants = require('./constants');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchSetTokenAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchSetPermanentTokenAndDeviceIdAction),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchClearTokenAction),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(watchRefreshTokenAction),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(setTokenSaga),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(setPermanentTokenAndDeviceIdSaga),
    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(putRefreshTokenActionWithDelaySaga),
    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(clearTokenSaga),
    _marked9 = /*#__PURE__*/regeneratorRuntime.mark(refreshTokenSaga),
    _marked10 = /*#__PURE__*/regeneratorRuntime.mark(setTokenIfExistsSaga);

function watchSetTokenAction() {
  return regeneratorRuntime.wrap(function watchSetTokenAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_ACTION, setTokenSaga);

        case 2:
          _context.next = 4;
          return (0, _effects.takeEvery)(_constants.SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function watchSetPermanentTokenAndDeviceIdAction() {
  return regeneratorRuntime.wrap(function watchSetPermanentTokenAndDeviceIdAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_constants.SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION, setPermanentTokenAndDeviceIdSaga);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchClearTokenAction() {
  return regeneratorRuntime.wrap(function watchClearTokenAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)(_constants.CLEAR_TOKEN_ACTION, clearTokenSaga);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function watchRefreshTokenAction() {
  return regeneratorRuntime.wrap(function watchRefreshTokenAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeEvery)(_constants.REFRESH_TOKEN_ACTION, refreshTokenSaga);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function setTokenSaga(action) {
  var token;
  return regeneratorRuntime.wrap(function setTokenSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = action.payload;
          _context5.next = 3;
          return (0, _effects.call)(_utils.setAuthDataInStorage, { token: token });

        case 3:
          _context5.next = 5;
          return (0, _effects.call)(_api.setAuthorizationTokenInHeaders, token);

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function setPermanentTokenAndDeviceIdSaga(action) {
  var _action$payload, permanentToken, deviceId;

  return regeneratorRuntime.wrap(function setPermanentTokenAndDeviceIdSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _action$payload = action.payload, permanentToken = _action$payload.permanentToken, deviceId = _action$payload.deviceId;
          _context6.next = 3;
          return (0, _effects.call)(_utils.setAuthDataInStorage, {
            permanentToken: permanentToken,
            deviceId: deviceId
          });

        case 3:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function putRefreshTokenActionWithDelaySaga() {
  var tokenExpiryTime;
  return regeneratorRuntime.wrap(function putRefreshTokenActionWithDelaySaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.select)(_selectors.selectTokenExpiryTime);

        case 2:
          tokenExpiryTime = _context7.sent;
          _context7.next = 5;
          return (0, _effects.call)(_reduxSaga.delay, tokenExpiryTime);

        case 5:
          _context7.next = 7;
          return (0, _effects.put)((0, _actions.refreshTokenAction)());

        case 7:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function clearTokenSaga() {
  return regeneratorRuntime.wrap(function clearTokenSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.call)(_utils.removeAuthDataFromStorage);

        case 2:
          _context8.next = 4;
          return (0, _effects.call)(_api.removeAuthorizationTokenInHeaders);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked8, this);
}

function refreshTokenSaga() {
  var permanentToken, response, hasTokenRefreshed;
  return regeneratorRuntime.wrap(function refreshTokenSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.select)(_selectors.selectPermanentToken);

        case 2:
          permanentToken = _context9.sent;

          if (!permanentToken) {
            _context9.next = 16;
            break;
          }

          _context9.prev = 4;
          _context9.next = 7;
          return (0, _effects.call)(_api.refreshToken, permanentToken);

        case 7:
          response = _context9.sent;
          _context9.next = 10;
          return (0, _effects.put)((0, _actions.setTokenAction)(response.data.token));

        case 10:
          _context9.next = 16;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9['catch'](4);
          _context9.next = 16;
          return (0, _effects.put)((0, _actions.clearTokenAction)());

        case 16:
          _context9.next = 18;
          return (0, _effects.select)(_selectors.selectHasTokenRefreshed);

        case 18:
          hasTokenRefreshed = _context9.sent;

          if (hasTokenRefreshed) {
            _context9.next = 22;
            break;
          }

          _context9.next = 22;
          return (0, _effects.put)((0, _actions.markTokenAsRefreshedAction)());

        case 22:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked9, this, [[4, 12]]);
}

function setTokenIfExistsSaga(action) {
  var token;
  return regeneratorRuntime.wrap(function setTokenIfExistsSaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          token = (0, _selectors.selectTokenFromActionPayload)(action);

          if (!token) {
            _context10.next = 4;
            break;
          }

          _context10.next = 4;
          return (0, _effects.put)((0, _actions.setTokenAction)(token));

        case 4:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked10, this);
}

exports.default = [watchSetTokenAction, watchSetPermanentTokenAndDeviceIdAction, watchClearTokenAction, watchRefreshTokenAction];