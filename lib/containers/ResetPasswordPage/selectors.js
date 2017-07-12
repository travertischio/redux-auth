'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectResetPasswordPageDomain = undefined;

var _reselect = require('reselect');

var selectResetPasswordPageDomain = function selectResetPasswordPageDomain(state) {
  return state.get('resetPasswordPage');
};

var selectResetPasswordPage = (0, _reselect.createSelector)(selectResetPasswordPageDomain, function (substate) {
  return substate.toJS();
});

exports.default = selectResetPasswordPage;
exports.selectResetPasswordPageDomain = selectResetPasswordPageDomain;