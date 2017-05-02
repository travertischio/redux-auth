'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRequestPasswordResetPageDomain = undefined;

var _reselect = require('reselect');

var selectRequestPasswordResetPageDomain = function selectRequestPasswordResetPageDomain(state) {
  return state.get('requestPasswordResetPage');
};

var selectRequestPasswordResetPage = (0, _reselect.createSelector)(selectRequestPasswordResetPageDomain, function (substate) {
  return substate.toJS();
});

exports.default = selectRequestPasswordResetPage;
exports.selectRequestPasswordResetPageDomain = selectRequestPasswordResetPageDomain;