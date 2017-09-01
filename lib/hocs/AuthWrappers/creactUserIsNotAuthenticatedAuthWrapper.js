'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _actions = require('../../containers/AuthenticationProvider/actions');

function creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath) {
  return (0, _reduxAuthWrapper.UserAuthWrapper)({
    authSelector: _selectors.selectUser,
    predicate: isNotAuthenticated,
    redirectAction: _actions.redirectActionWithSupportParamInQueryString,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    failureRedirectPath: failureRedirectPath
  });
}

function isNotAuthenticated(user) {
  return !user;
}

exports.default = creactUserIsNotAuthenticatedAuthWrapper;