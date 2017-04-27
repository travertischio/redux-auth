'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignInPageDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the signInPage state domain
 */
var selectSignInPageDomain = function selectSignInPageDomain(state) {
  return state.get('signInPage');
};

var makeSelectSignInPage = function makeSelectSignInPage() {
  return (0, _reselect.createSelector)(selectSignInPageDomain, function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectSignInPage;
exports.selectSignInPageDomain = selectSignInPageDomain;