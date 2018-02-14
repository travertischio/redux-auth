'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUserData = exports.UserIsNotAuthenticated = exports.UserIsAuthenticated = exports.UserIsAdmin = exports.UserHasRole = exports.setConfig = exports.sagas = exports.removeAuthorizationTokenInHeaders = exports.reducer = exports.createSignUpContainer = exports.createSignInContainer = exports.createSignInConfirmCodeContainer = exports.createResetPasswordContainer = exports.createRequestPasswordResetContainer = exports.AuthenticationProvider = undefined;

var _actions = require('./containers/AuthenticationProvider/actions');

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _constants = require('./containers/AuthenticationProvider/constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

var _selectors = require('./containers/AuthenticationProvider/selectors');

Object.keys(_selectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectors[key];
    }
  });
});

var _AuthenticationProvider = require('./containers/AuthenticationProvider');

var _AuthenticationProvider2 = _interopRequireDefault(_AuthenticationProvider);

var _createContainer = require('./containers/RequestPasswordResetPage/create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

var _createContainer3 = require('./containers/ResetPasswordPage/create-container');

var _createContainer4 = _interopRequireDefault(_createContainer3);

var _createContainer5 = require('./containers/SignInConfirmCodePage/create-container');

var _createContainer6 = _interopRequireDefault(_createContainer5);

var _createContainer7 = require('./containers/SignInPage/create-container');

var _createContainer8 = _interopRequireDefault(_createContainer7);

var _createContainer9 = require('./containers/SignUpPage/create-container');

var _createContainer10 = _interopRequireDefault(_createContainer9);

var _creactUserIsNotAuthenticatedAuthWrapper = require('./hocs/AuthWrappers/creactUserIsNotAuthenticatedAuthWrapper');

var _creactUserIsNotAuthenticatedAuthWrapper2 = _interopRequireDefault(_creactUserIsNotAuthenticatedAuthWrapper);

var _reducer = require('./containers/AuthenticationProvider/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _sagas = require('./containers/AuthenticationProvider/sagas');

var _sagas2 = _interopRequireDefault(_sagas);

var _UserHasRole = require('./hocs/AuthWrappers/UserHasRole');

var _UserHasRole2 = _interopRequireDefault(_UserHasRole);

var _UserIsAdmin = require('./hocs/AuthWrappers/UserIsAdmin');

var _UserIsAdmin2 = _interopRequireDefault(_UserIsAdmin);

var _UserIsAuthenticated = require('./hocs/AuthWrappers/UserIsAuthenticated');

var _UserIsAuthenticated2 = _interopRequireDefault(_UserIsAuthenticated);

var _UserIsNotAuthenticated = require('./hocs/AuthWrappers/UserIsNotAuthenticated');

var _UserIsNotAuthenticated2 = _interopRequireDefault(_UserIsNotAuthenticated);

var _withUserData = require('./hocs/withUserData');

var _withUserData2 = _interopRequireDefault(_withUserData);

var _api = require('./api');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('index');
console.log(_config2.default.userIsNotAuthenticatedRedirectPath);

(0, _config.setConfig)({
  signInAuthWrapper: (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(_config2.default.redirectPathAfterSignIn),
  signUpAuthWrapper: (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(_config2.default.redirectPathAfterSignUp)
});

exports.default = _AuthenticationProvider2.default;
exports.AuthenticationProvider = _AuthenticationProvider2.default;
exports.createRequestPasswordResetContainer = _createContainer2.default;
exports.createResetPasswordContainer = _createContainer4.default;
exports.createSignInConfirmCodeContainer = _createContainer6.default;
exports.createSignInContainer = _createContainer8.default;
exports.createSignUpContainer = _createContainer10.default;
exports.reducer = _reducer2.default;
exports.removeAuthorizationTokenInHeaders = _api.removeAuthorizationTokenInHeaders;
exports.sagas = _sagas2.default;
exports.setConfig = _config.setConfig;
exports.UserHasRole = _UserHasRole2.default;
exports.UserIsAdmin = _UserIsAdmin2.default;
exports.UserIsAuthenticated = _UserIsAuthenticated2.default;
exports.UserIsNotAuthenticated = _UserIsNotAuthenticated2.default;
exports.withUserData = _withUserData2.default;