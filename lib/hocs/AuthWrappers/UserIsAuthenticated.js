'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redirect = require('redux-auth-wrapper/history4/redirect');

var _actions = require('../../containers/AuthenticationProvider/actions');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserIsAuthenticated = (0, _redirect.connectedReduxRedirect)({
  authenticatedSelector: _selectors.selectIsAuthenticated,
  redirectAction: _actions.redirectActionWithSupportParamInQueryString,
  redirectPath: _config2.default.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated'
});

exports.default = UserIsAuthenticated;