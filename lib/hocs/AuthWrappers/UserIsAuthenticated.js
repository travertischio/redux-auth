'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectedReduxRedirect = require('./connectedReduxRedirect');

var _connectedReduxRedirect2 = _interopRequireDefault(_connectedReduxRedirect);

var _actions = require('../../containers/AuthenticationProvider/actions');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserIsAuthenticated = (0, _connectedReduxRedirect2.default)({
  authenticatedSelector: _selectors.selectIsAuthenticated,
  redirectAction: _actions.redirectActionWithSupportParamInQueryString,
  redirectPath: _config2.default.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated'
});

exports.default = UserIsAuthenticated;