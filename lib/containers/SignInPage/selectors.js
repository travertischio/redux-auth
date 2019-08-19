"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignInPageDomain = exports["default"] = void 0;

var _reselect = require("reselect");

var selectSignInPageDomain = function selectSignInPageDomain(state) {
  return state.get('signInPage');
};

exports.selectSignInPageDomain = selectSignInPageDomain;
var selectSignInPage = (0, _reselect.createSelector)(selectSignInPageDomain, function (substate) {
  return substate.toJS();
});
var _default = selectSignInPage;
exports["default"] = _default;