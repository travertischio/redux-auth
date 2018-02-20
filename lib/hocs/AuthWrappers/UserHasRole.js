'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../../containers/AuthenticationProvider/actions');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _connectedReduxRedirect = require('./connectedReduxRedirect');

var _connectedReduxRedirect2 = _interopRequireDefault(_connectedReduxRedirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserHasRole = function UserHasRole(expectedRoles) {
  return (0, _connectedReduxRedirect2.default)({
    authenticatedSelector: makeUserHasOfEpectedRoleSelector(expectedRoles),
    redirectAction: _actions.redirectActionWithSupportParamInQueryString,
    redirectPath: function redirectPath() {
      return _config2.default.userHasNoRoleRedirectPath;
    },
    allowRedirectBack: false,
    wrapperDisplayName: 'UserHasRole'
  });
};

function makeUserHasOfEpectedRoleSelector(expectedRoles) {
  return function (state) {
    var user = (0, _selectors.selectUser)(state);

    return user && expectedRoles.includes(user.role);
  };
}

exports.default = UserHasRole;