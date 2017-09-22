'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redirect = require('redux-auth-wrapper/history4/redirect');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _actions = require('../../containers/AuthenticationProvider/actions');

function creactUserIsNotAuthenticatedAuthWrapper(redirectPath) {
  return (0, _redirect.connectedReduxRedirect)({
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