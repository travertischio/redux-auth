'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignInConfirmCodePageDomain = undefined;

var _reselect = require('reselect');

var selectSignInConfirmCodePageDomain = function selectSignInConfirmCodePageDomain(state) {
  return state.get('signInConfirmCodePage');
};

var selectSignInConfirmCodePage = (0, _reselect.createSelector)(selectSignInConfirmCodePageDomain, function (substate) {
  return substate.toJS();
});

exports.default = selectSignInConfirmCodePage;
exports.selectSignInConfirmCodePageDomain = selectSignInConfirmCodePageDomain;