"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignUpPageDomain = exports["default"] = void 0;

var _reselect = require("reselect");

var selectSignUpPageDomain = function selectSignUpPageDomain(state) {
  return state.get('signUpPage');
};

exports.selectSignUpPageDomain = selectSignUpPageDomain;
var selectSignUpPage = (0, _reselect.createSelector)(selectSignUpPageDomain, function (substate) {
  return substate.toJS();
});
var _default = selectSignUpPage;
exports["default"] = _default;