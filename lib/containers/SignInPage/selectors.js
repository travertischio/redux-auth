'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignInPageDomain = undefined;

var _reselect = require('reselect');

var selectSignInPageDomain = function selectSignInPageDomain(state) {
  return state.get('signInPage');
};

var selectSignInPage = (0, _reselect.createSelector)(selectSignInPageDomain, function (substate) {
  return substate.toJS();
});

exports.default = selectSignInPage;
exports.selectSignInPageDomain = selectSignInPageDomain;