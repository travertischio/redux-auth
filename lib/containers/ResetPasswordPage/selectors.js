"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectResetPasswordPageDomain = exports["default"] = void 0;

var _reselect = require("reselect");

var selectResetPasswordPageDomain = function selectResetPasswordPageDomain(state) {
  return state.get('resetPasswordPage');
};

exports.selectResetPasswordPageDomain = selectResetPasswordPageDomain;
var selectResetPasswordPage = (0, _reselect.createSelector)(selectResetPasswordPageDomain, function (substate) {
  return substate.toJS();
});
var _default = selectResetPasswordPage;
exports["default"] = _default;