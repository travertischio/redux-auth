"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _config = _interopRequireDefault(require("../../config"));

var _createUserIsNotAuthenticatedAuthWrapper = _interopRequireDefault(require("./createUserIsNotAuthenticatedAuthWrapper"));

var UserIsNotAuthenticated = function UserIsNotAuthenticated(failureRedirectPathOrPageComponent) {
  // It is possible to use this wrapper in two ways:
  // 1st: With passing to it failure redirect path:
  // UserIsNotAuthenticated('/take-me-here')(PageComponent)
  // or:
  // @UserIsNotAuthenticated('/take-me-here')
  // PageComponent
  if ((0, _isString2["default"])(failureRedirectPathOrPageComponent)) {
    var _failureRedirectPath = failureRedirectPathOrPageComponent;
    return (0, _createUserIsNotAuthenticatedAuthWrapper["default"])(_failureRedirectPath);
  } // 2nd.: Without passing explicit failure redirect path, but directly page component:
  // UserIsNotAuthenticated(PageComponent)
  // or:
  // @UserIsNotAuthenticated
  // PageComponent


  var failureRedirectPath = _config["default"].userIsAuthenticatedRedirectPath;
  var authWrapper = (0, _createUserIsNotAuthenticatedAuthWrapper["default"])(failureRedirectPath);
  var pageComponent = failureRedirectPathOrPageComponent;
  return authWrapper(pageComponent);
};

var _default = UserIsNotAuthenticated;
exports["default"] = _default;