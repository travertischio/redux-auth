'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectResetPasswordPageDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the resetPasswordPage state domain
 */
var selectResetPasswordPageDomain = function selectResetPasswordPageDomain(state) {
  return state.get('resetPasswordPage');
};

var makeSelectResetPasswordPage = function makeSelectResetPasswordPage() {
  return (0, _reselect.createSelector)(selectResetPasswordPageDomain, function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectResetPasswordPage;
exports.selectResetPasswordPageDomain = selectResetPasswordPageDomain;