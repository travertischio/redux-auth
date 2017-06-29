'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _creactUserIsNotAuthenticatedAuthWrapper = require('./creactUserIsNotAuthenticatedAuthWrapper');

var _creactUserIsNotAuthenticatedAuthWrapper2 = _interopRequireDefault(_creactUserIsNotAuthenticatedAuthWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserIsNotAuthenticated = function UserIsNotAuthenticated(failureRedirectPathOrPageComponent) {
  // It is possible to use this wrapper in two ways:
  // 1st: With passing to it failure redirect path:
  // UserIsNotAuthenticated('/take-me-here')(PageComponent)
  // or:
  // @UserIsNotAuthenticated('/take-me-here')
  // PageComponent
  if ((0, _isString3.default)(failureRedirectPathOrPageComponent)) {
    var _failureRedirectPath = failureRedirectPathOrPageComponent;
    return (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(_failureRedirectPath);
  }

  // 2nd.: Without passing explicit failure redirect path, but directly page component:
  // UserIsNotAuthenticated(PageComponent)
  // or:
  // @UserIsNotAuthenticated
  // PageComponent
  var failureRedirectPath = _config2.default.userIsAuthenticatedRedirectPath;
  var authWrapper = (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(failureRedirectPath);
  var pageComponent = failureRedirectPathOrPageComponent;
  return authWrapper(pageComponent);
};

exports.default = UserIsNotAuthenticated;