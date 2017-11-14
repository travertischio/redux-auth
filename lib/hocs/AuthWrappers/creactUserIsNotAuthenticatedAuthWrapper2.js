'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectedReduxRedirect = require('./connectedReduxRedirect');

var _connectedReduxRedirect2 = _interopRequireDefault(_connectedReduxRedirect);

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _actions = require('../../containers/AuthenticationProvider/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creactUserIsNotAuthenticatedAuthWrapper(redirectPath) {
  return (0, _connectedReduxRedirect2.default)({
    authenticatedSelector: isNotAuthenticatedSelector,
    redirectAction: _actions.redirectActionWithSupportParamInQueryString,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: redirectPath
  });
}

function isNotAuthenticatedSelector(state) {
  var isAuthenticated = (0, _selectors.selectIsAuthenticated)(state);

  return !isAuthenticated;
}

exports.default = creactUserIsNotAuthenticatedAuthWrapper;