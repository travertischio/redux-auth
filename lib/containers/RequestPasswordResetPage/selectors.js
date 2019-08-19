"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRequestPasswordResetPageDomain = exports["default"] = void 0;

var _reselect = require("reselect");

var selectRequestPasswordResetPageDomain = function selectRequestPasswordResetPageDomain(state) {
  return state.get('requestPasswordResetPage');
};

exports.selectRequestPasswordResetPageDomain = selectRequestPasswordResetPageDomain;
var selectRequestPasswordResetPage = (0, _reselect.createSelector)(selectRequestPasswordResetPageDomain, function (substate) {
  return substate.toJS();
});
var _default = selectRequestPasswordResetPage;
exports["default"] = _default;