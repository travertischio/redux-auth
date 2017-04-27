'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignUpPageDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the signUpPage state domain
 */
var selectSignUpPageDomain = function selectSignUpPageDomain(state) {
  return state.get('signUpPage');
};

var makeSelectSignUpPage = function makeSelectSignUpPage() {
  return (0, _reselect.createSelector)(selectSignUpPageDomain,
  // TODO drop toJS
  function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectSignUpPage;
exports.selectSignUpPageDomain = selectSignUpPageDomain;