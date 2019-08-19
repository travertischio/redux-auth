"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AuthenticationProvider: true,
  createRequestPasswordResetContainer: true,
  createResetPasswordContainer: true,
  createSignInConfirmCodeContainer: true,
  createSignInContainer: true,
  createSignUpContainer: true,
  reducer: true,
  sagas: true,
  UserHasRole: true,
  UserIsAdmin: true,
  UserIsAuthenticated: true,
  UserIsNotAuthenticated: true,
  withUserData: true,
  removeAuthorizationTokenInHeaders: true,
  setConfig: true
};
Object.defineProperty(exports, "AuthenticationProvider", {
  enumerable: true,
  get: function get() {
    return _AuthenticationProvider["default"];
  }
});
Object.defineProperty(exports, "createRequestPasswordResetContainer", {
  enumerable: true,
  get: function get() {
    return _createContainer["default"];
  }
});
Object.defineProperty(exports, "createResetPasswordContainer", {
  enumerable: true,
  get: function get() {
    return _createContainer2["default"];
  }
});
Object.defineProperty(exports, "createSignInConfirmCodeContainer", {
  enumerable: true,
  get: function get() {
    return _createContainer3["default"];
  }
});
Object.defineProperty(exports, "createSignInContainer", {
  enumerable: true,
  get: function get() {
    return _createContainer4["default"];
  }
});
Object.defineProperty(exports, "createSignUpContainer", {
  enumerable: true,
  get: function get() {
    return _createContainer5["default"];
  }
});
Object.defineProperty(exports, "reducer", {
  enumerable: true,
  get: function get() {
    return _reducer["default"];
  }
});
Object.defineProperty(exports, "sagas", {
  enumerable: true,
  get: function get() {
    return _sagas["default"];
  }
});
Object.defineProperty(exports, "UserHasRole", {
  enumerable: true,
  get: function get() {
    return _UserHasRole["default"];
  }
});
Object.defineProperty(exports, "UserIsAdmin", {
  enumerable: true,
  get: function get() {
    return _UserIsAdmin["default"];
  }
});
Object.defineProperty(exports, "UserIsAuthenticated", {
  enumerable: true,
  get: function get() {
    return _UserIsAuthenticated["default"];
  }
});
Object.defineProperty(exports, "UserIsNotAuthenticated", {
  enumerable: true,
  get: function get() {
    return _UserIsNotAuthenticated["default"];
  }
});
Object.defineProperty(exports, "withUserData", {
  enumerable: true,
  get: function get() {
    return _withUserData["default"];
  }
});
Object.defineProperty(exports, "removeAuthorizationTokenInHeaders", {
  enumerable: true,
  get: function get() {
    return _api.removeAuthorizationTokenInHeaders;
  }
});
Object.defineProperty(exports, "setConfig", {
  enumerable: true,
  get: function get() {
    return _config.setConfig;
  }
});
exports["default"] = void 0;

var _AuthenticationProvider = _interopRequireDefault(require("./containers/AuthenticationProvider"));

var _createContainer = _interopRequireDefault(require("./containers/RequestPasswordResetPage/create-container"));

var _createContainer2 = _interopRequireDefault(require("./containers/ResetPasswordPage/create-container"));

var _createContainer3 = _interopRequireDefault(require("./containers/SignInConfirmCodePage/create-container"));

var _createContainer4 = _interopRequireDefault(require("./containers/SignInPage/create-container"));

var _createContainer5 = _interopRequireDefault(require("./containers/SignUpPage/create-container"));

var _reducer = _interopRequireDefault(require("./containers/AuthenticationProvider/reducer"));

var _sagas = _interopRequireDefault(require("./containers/AuthenticationProvider/sagas"));

var _UserHasRole = _interopRequireDefault(require("./hocs/AuthWrappers/UserHasRole"));

var _UserIsAdmin = _interopRequireDefault(require("./hocs/AuthWrappers/UserIsAdmin"));

var _UserIsAuthenticated = _interopRequireDefault(require("./hocs/AuthWrappers/UserIsAuthenticated"));

var _UserIsNotAuthenticated = _interopRequireDefault(require("./hocs/AuthWrappers/UserIsNotAuthenticated"));

var _withUserData = _interopRequireDefault(require("./hocs/withUserData"));

var _api = require("./api");

var _config = require("./config");

var _actions = require("./containers/AuthenticationProvider/actions");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _constants = require("./containers/AuthenticationProvider/constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

var _selectors = require("./containers/AuthenticationProvider/selectors");

Object.keys(_selectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectors[key];
    }
  });
});
var _default = _AuthenticationProvider["default"];
exports["default"] = _default;