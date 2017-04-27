'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRequestPasswordResetPageDomain = undefined;

var _reselect = require('reselect');

var selectRequestPasswordResetPageDomain = function selectRequestPasswordResetPageDomain(state) {
  return state.get('requestPasswordResetPage');
};

var makeSelectRequestPasswordResetPage = function makeSelectRequestPasswordResetPage() {
  return (0, _reselect.createSelector)(selectRequestPasswordResetPageDomain, function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectRequestPasswordResetPage;
exports.selectRequestPasswordResetPageDomain = selectRequestPasswordResetPageDomain;